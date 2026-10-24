---
title: "AVR128DA48 Low-Power Design: Sleep Modes, Peripheral Shutdown, and Leakage Current Control"
date: 2026-05-03
description: "A state-machine-based approach to deep sleep, wake-up scheduling, and reducing pin-state current on the AVR128DA48."
categories: [Embedded Systems, AVR, Low-Power Design]

hashnode: true
hashnode_url: "https://sxvyte.hashnode.dev/avr128da48-low-power-design-sleep-modes-peripheral-shutdown-and-leakage-current-control"
---

## Introduction

Battery-powered embedded systems live and die by their sleep current. The difference between a product that lasts months and one that lasts years often comes down to what happens when the microcontroller is doing nothing. On modern AVR Dx-series devices like the AVR128DA48, the Power-Down sleep mode can theoretically bring the core down to microamp-level consumption. However, reaching that theoretical floor requires understanding not just the CPU, but the behavior of every single pin and peripheral connected to it.

This article explores the hardware-level mechanisms that govern sleep current on the AVR128DA48. We will examine the three critical domains of power reduction: sleep mode selection, peripheral shutdown, and GPIO pin state management, including the subtle but crucial distinction between high-impedance, pull-up, and pull-down configurations and how external components interact with them.

## Part 1: Sleep Modes and the Power-Down State

The AVR128DA48 provides three distinct sleep modes: Idle, Standby, and Power-Down. Each represents a different trade-off between wake-up latency and current consumption.

### Idle Sleep Mode

In Idle mode, the CPU halts instruction execution, but all clock domains remain active. Every peripheral that was running in Active mode continues to run. Consequently, Idle mode offers only marginal power savings: roughly half of Active mode consumption and is unsuitable for applications targeting sub-100 µA operation.

### Standby Sleep Mode

Standby mode stops the high-frequency oscillator (OSCHF) but allows individual peripherals to remain active if their RUNSTDBY bits are set. The power consumption in Standby is therefore highly variable and dependent on which peripherals are enabled. While Standby supports a broader set of wake-up sources, it does not represent the minimum achievable sleep current.

### Power-Down Sleep Mode

Power-Down is the deepest sleep state. In this mode, the high-frequency oscillator is completely stopped. Only the 32.768 kHz oscillator, the Watchdog Timer (WDT), and the Periodic Interrupt Timer (PIT) remain operational. Critically, the set of wake-up sources is restricted to:

- Pin change interrupts
- TWI address match
- CCL (with filter and edge-detect disabled)

For the AVR128DA48, entering Power-Down mode is the essential first step toward achieving sleep currents in the range of 5–10 µA at the core level. However, the core alone is not the whole story.

## Part 2: Peripheral Shutdown: Nothing Runs for Free

Modern microcontrollers integrate a rich set of peripherals—USARTs, SPI, TWI, timers, analog comparators, ADCs, DACs, CCL, and more. In Power-Down sleep, the CPU clock is stopped, but this does not automatically gate the power to these peripherals. Many retain their configuration state and continue to draw quiescent current.

### The Cost of Idle Peripherals

Each enabled peripheral contributes to the total sleep current through:

- **Static (leakage) current:** Transistors in the peripheral's logic gates leak current even when no switching occurs.
- **Bias currents:** Analog peripherals such as the ADC, DAC, and analog comparators require internal reference voltages and bias networks that draw current continuously when enabled.
- **Clock tree loading:** Even if the main clock is stopped, some peripherals maintain internal oscillators or sample clocks that consume power.

According to Microchip's application notes, disabling unused peripherals is one of the most effective steps for reducing power consumption. On the AVR DA series, this is not achieved through a single global register (as on older AVRs with PRR registers), but by explicitly clearing the enable bits in each peripheral's control registers.

### Key Peripherals to Disable

For minimum sleep current, the following peripherals must be explicitly disabled if not needed:

- **Analog Comparators (AC0, AC1, AC2):** Each comparator's enable bit must be cleared.
- **ADC and Voltage Reference:** The ADC enable bit and the ALWAYSON bits in the VREF module must be cleared.
- **Timers (TCA, TCB, TCD):** All timer/counter modules must be stopped.
- **USARTs, SPI, TWI:** Serial peripherals must have their enable bits cleared.
- **CCL and ZCD:** Configurable Custom Logic and Zero-Cross Detectors must be disabled.
- **DAC:** The Digital-to-Analog Converter must be shut down.
- **RTC and PIT:** Unless used as a wake-up source, the Real-Time Counter and its Periodic Interrupt Timer should be disabled.
- **WDT:** The Watchdog Timer must be disabled via the Configuration Change Protection (CCP) mechanism.

Even the Brown-Out Detector (BOD), which monitors supply voltage for safe operation, draws current. Disabling the BOD during sleep via the BOD.CTRLA register can yield additional savings, at the cost of reduced protection against brown-out conditions during the sleep period.

## Part 3: GPIO Pin States: The Hidden Power Drain

This is where many low-power designs fail to reach their potential. The AVR128DA48 has up to 48 GPIO pins across six ports (A–F). The state of each pin during sleep has a direct and often dominant effect on total current consumption.

### The Digital Input Buffer Problem

Every GPIO pin on the AVR128DA48 has a digital input buffer that continuously samples the pin voltage and drives it to a defined logic level (high or low) for the internal digital logic. If a pin is configured as an input and left floating, the voltage at the pin can drift to an intermediate level—typically near VCC/2. When a CMOS input buffer sees a voltage near its switching threshold, both the PMOS and NMOS transistors in the input inverter stage can conduct simultaneously, creating a direct current path from VCC to ground. This "shoot-through" current can reach tens or hundreds of microamperes per pin.

For this reason, floating inputs are unacceptable in low-power designs.

### The Three Fundamental Pin States

Understanding how to configure pins requires understanding three distinct electrical states:

#### 1. Output Low (Strong Drive)

When a pin is configured as an output and driven low (DIR = 1, OUT = 0), the internal NMOS transistor pulls the pin firmly to ground. The pin presents a very low impedance to ground: typically tens of ohms. If nothing is connected externally, this state draws negligible current. If an external component is connected, the MCU actively sinks current from it.

**Current implication:** If an external component (e.g., an LED, a sensor with a pull-up, or another IC's output) tries to drive the pin high while the MCU drives it low, the MCU will sink current directly into its ground rail. This can dominate the sleep current budget.

#### 2. Output High (Strong Drive)

When a pin is configured as an output and driven high (DIR = 1, OUT = 1), the internal PMOS transistor pulls the pin to VCC. The pin presents a low impedance to the supply rail.

**Current implication:** If an external component pulls the pin low (e.g., through a pull-down resistor or an open-drain output), the MCU sources current into that component. Again, this can become a major current drain.

#### 3. Input with Pull-Up or Pull-Down

When a pin is configured as an input with the internal pull-up enabled (DIR = 0, PULLUPEN = 1), a weak resistor (typically 20–50 kΩ on AVR devices) connects the pin to VCC. This ensures the pin sits at a defined high level when not driven externally, preventing the floating-input shoot-through problem.

With an internal pull-down (if available), the pin is weakly held at ground.

**Current implication:** If an external device drives the pin low while the internal pull-up is enabled, current flows continuously from VCC through the pull-up resistor to ground. At 3.3V with a 35 kΩ pull-up, this is approximately 94 µA per pin. With multiple pins in this state, the sleep current budget is destroyed.

#### 4. High-Impedance (Tri-State) with Input Buffer Disabled

This is the most nuanced state. On the AVR DA series, each pin has an ISC (Input/Sense Configuration) field in its PINnCTRL register. Setting this to PORT_ISC_INPUT_DISABLE_gc does two things:

- It disables the digital input buffer entirely, eliminating the risk of shoot-through current from floating voltages.
- It leaves the pin in a high-impedance state where neither the output driver nor the pull-up/pull-down is active.

In this state, the pin is effectively electrically disconnected from the internal digital logic. The only remaining connection is through the electrostatic discharge (ESD) protection diodes and minimal pad leakage—typically on the order of nanoamperes.

**Current implication:** This is the ideal state for unused pins. However, if an external component is connected, the pin's high-impedance state means the external component determines the voltage. If that component has its own pull-up or pull-down, or if it drives the line, no additional current is drawn by the MCU—but the external component's own current consumption must be considered in the system-level budget.

## Part 4: The External Component Interaction Problem

This is the critical insight for custom PCB designs: the MCU's pin configuration and the external circuit's behavior are inseparable in determining sleep current.

### Scenario A: MCU Pin as Output Low, External Component with Pull-Up

Consider a pin on the AVR128DA48 configured as an output driven low. Externally, a sensor or communication IC has a 10 kΩ pull-up resistor to VCC on the same line. When the MCU sleeps with this pin low, it forms a direct path: VCC → 10 kΩ → MCU pin → ground. The current is:

$I = \frac{V_{CC}}{R_{\text{pullup}}} = \frac{3.3V}{10\,k\Omega} = 330\,\mu A$

This single pin consumes more than the entire target sleep budget. The MCU is effectively sinking current on behalf of the external component.

### Scenario B: MCU Pin as Input with Internal Pull-Up, External Component Driving Low

The MCU enables its internal pull-up (≈35 kΩ). The external component is an open-drain output or a switch that pulls the line to ground. The current is:

$I = \frac{3.3V}{35\,k\Omega} \approx 94\,\mu A$

Again, a single pin can dominate the power budget.

### Scenario C: MCU Pin in High-Impedance State, External Component with Its Own Pull-Up

The MCU disables its input buffer and output driver. The external component maintains a 10 kΩ pull-up to VCC. In this case:

- The MCU draws virtually zero current through the pin (only leakage).
- The external pull-up resistor draws zero current because nothing is pulling the line low.
- The pin voltage floats to VCC, which is fine because the MCU's input buffer is disabled.

This is the correct configuration for an unused pin that is tied to an external component's pull-up.

### Scenario D: MCU Pin in High-Impedance State, External Component Driving a Defined Level

If the external component actively drives the line high or low, and the MCU pin is in high-impedance with the input buffer disabled, the MCU again draws only leakage current. The external component's drive current is determined by its own design, not by the MCU.

## Part 5: The "All Pins Low" Strategy: Why It Works on a Bare Board

On the AVR128DA48 Curiosity Nano evaluation board, with no external circuitry beyond the board's own components, configuring all pins as outputs driven low is an effective strategy. Here's why:

- **No floating inputs:** Every pin has a defined voltage level (0V), eliminating shoot-through current.
- **No pull-up conflicts:** Since there are no external pull-ups on most pins (except those specifically wired to the onboard debugger or buttons), driving pins low does not create current paths.
- **Debugger isolation:** The Curiosity Nano's onboard nEDBG debugger connects to several pins through level shifters. These level shifters can leak up to 2 µA per pin if the MCU pin is not in a high-impedance state . Tri-stating these specific pins is necessary for absolute minimum current.

The measured 68 µA sleep current on the Curiosity Nano represents the sum of:

- The AVR128DA48 core in Power-Down mode (typically \~5–10 µA at 25°C)
- Residual peripheral leakage (minimal if all are disabled)
- Curiosity Nano board-level leakage (level shifters, power LED circuitry, regulator quiescent current)

On a custom PCB with a clean power supply and no debugger circuitry, 10 µA sleep currents may be achievable.

## Part 6: Designing for Custom PCBs: The High-Impedance Imperative

When moving from an evaluation board to a custom PCB, the pin configuration strategy must evolve.

### The Rule

Any pin connected to an external active component must be placed in a high-impedance state with the input buffer disabled during sleep, unless the pin is actively required to drive or sense something.

### Justification

If a pin is connected to an external component and you drive it low during sleep:

- You may create a current sink path if the external component has any path to VCC (pull-ups, internal logic, bias networks).
- You may interfere with the external component's own sleep or reset state.

If you enable an internal pull-up during sleep:

- You source current if the external component pulls the line low.
- You create a voltage divider if the external component also has a pull-down.

The high-impedance state with input buffer disabled (PORT_ISC_INPUT_DISABLE_gc) is the only state that guarantees the MCU does not interact electrically with the external component. The external component must be responsible for its own pin state through its own pull-ups, pull-downs, or active drive.

### Practical Example: I2C Bus

An I2C bus has external pull-up resistors (typically 4.7 kΩ to 10 kΩ) on SDA and SCL. If the MCU's TWI module is disabled in sleep but the pins are left as inputs with pull-ups enabled, the internal pull-ups (≈35 kΩ) form a parallel combination with the external pull-ups. More importantly, if the MCU drives these pins low, it sinks current through the external pull-ups continuously. The correct approach is to:

- Disable the TWI module.
- Configure the pins as high-impedance inputs with the digital input buffer disabled.
- Let the external pull-ups hold the bus at VCC with negligible current flow (only leakage through the disabled input buffers).

## Part 7: Interrupts, Wake-Up Sources, and Asynchronous vs. Synchronous Detection

The AVR128DA48's Power-Down mode only supports a subset of wake-up sources. For GPIO-based wake-up, the pin change interrupt is the primary mechanism available.

### Synchronous vs. Asynchronous Sensing

The ISC (Input/Sense Configuration) field in each pin's control register determines how the pin is sampled:

- **Synchronous sensing** (PORT_ISC_BOTHEDGES_gc, PORT_ISC_RISING_gc, PORT_ISC_FALLING_gc): The pin is sampled on the peripheral clock. This requires a running clock and is not functional in Power-Down mode for wake-up purposes.
- **Asynchronous sensing** (PORT_ISC_BOTHEDGES_gc with specific configurations, or level-sensitive interrupts): The pin change detection operates independently of the system clock, using dedicated asynchronous logic that remains active in Power-Down mode.

On the AVR DA series, the pin change interrupt for wake-up from Power-Down operates asynchronously for both-edge and level detection. Rising-edge-only or falling-edge-only detection may require a running clock and therefore cannot wake the device from Power-Down. This explains why both-edge detection is the reliable choice for wake-up: the asynchronous logic detects the transition without requiring the main oscillator to be running.

When the pin change interrupt fires, it triggers the wake-up sequence: the voltage regulator ramps up, the oscillator starts, and the CPU begins executing from the interrupt vector. The interrupt service routine then sets the application state to active, at which point the main loop can proceed.

## Part 8: The Complete Low-Power Checklist

To summarize the theoretical framework for achieving minimum sleep current on the AVR128DA48:

1. **Enter Power-Down sleep mode** using SLEEP_MODE_PWR_DOWN. This stops the high-frequency oscillator and minimizes core current.
2. **Disable the Brown-Out Detector** in sleep if supply voltage stability is guaranteed.
3. **Disable all unused peripherals explicitly** by clearing their enable bits. Do not rely on clock gating alone.
4. **Disable the Watchdog Timer** if not needed for wake-up.
5. **Configure every GPIO pin deliberately:**
   - Unused, unconnected pins: Output low or high-impedance with input buffer disabled.
   - Pins connected to external components: High-impedance with input buffer disabled, letting the external circuit define the line state.
   - Pins used as wake-up sources: Input with the appropriate sense configuration (both-edge for asynchronous wake-up from Power-Down), with the internal pull-up/pull-down configured only if the external circuit requires it.
6. **Verify external component behavior in sleep:** Ensure that external ICs do not draw excessive current through their connections to the MCU. This includes checking for open-drain outputs, pull-up resistors, and bias networks.
7. **Account for board-level leakage:** On evaluation boards, level shifters, debuggers, and power indicators contribute to measured current. Measure on a custom PCB for true validation.

## Demonstration

The concepts discussed in this article were validated on the AVR128DA48 Curiosity Nano board. A video demonstration of the working system is available below, showing the state machine in action: sleep mode with sub-100 µA current consumption, wake-up via pin change interrupt, LED activation for 2 seconds via TCA0 timer overflow, and return to sleep.

[Watch the demonstration on YouTube](https://www.youtube.com/watch?v=NzaxLnGLvM4)

## Source Code

The complete firmware implementing the state machine described in this article, along with the build system (Makefile) for the AVR128DA48 Curiosity Nano, is available in the GitHub repository linked below.

GitHub Repository: [avr128da48-low-power-design](https://github.com/subrata05/avr128da48-low-power-design)

## References

| Document                                           | Description                                                                                 | Link                                                                                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AVR128DA48/28/32/64 Datasheet**                  | Official datasheet covering sleep modes, electrical characteristics, and GPIO configuration | [DS40002183](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/AVR128DA28-32-48-64-Data-Sheet-DS40002183.pdf)        |
| **AVR DA Low-Power Features and Sleep Modes (AN)** | Application note demonstrating power modes and measurement techniques on AVR DA series      | [DS00003664A](https://www.microchip.com/content/dam/mchp/documents/MCU08/ApplicationNotes/ApplicationNotes/AVRDA-Low-Power-Features-SleepModes-DS00003664A.pdf) |
| **AVR Low Power Example Project**                  | Microchip Developer Help page with practical code examples for reducing power on 8-bit AVRs | [Developer Help](https://developerhelp.microchip.com/xwiki/bin/view/products/mcu-mpu/8-bit-avr/peripherals/low-power/8-bit-avr-low-power-example/)              |
| **AVR128DA48 Curiosity Nano Schematics**           | Board schematics showing nEDBG debugger, level shifters, and power circuitry                | [Schematics PDF](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/BoardDesignFiles/AVR128DA48-Curiosity-Nano-Schematics.pdf)   |
| **Low-Power Design Pattern (MCC Melody)**          | Microchip's official low-power design guidelines and MCC configuration references           | [Online Docs](https://onlinedocs.microchip.com/oxy/GUID-7CE1AEE9-2487-4E7B-B26B-93A577BA154E-en-US-2/GUID-389FF460-DF37-4C6F-92D6-E35FE4AD4C10.html)            |
