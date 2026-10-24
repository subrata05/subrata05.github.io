---
title: "BLE Communication Framework for AVR Microcontrollers"
description: "A lightweight C++ BLE driver for RN487x modules, enabling reliable UART communication and bidirectional GATT data exchange with AVR microcontrollers."
number: "02"
order: 2
featured: true
technologies:
  - Embedded C/C++
  - AVR
  - UART
  - Bluetooth Low Energy
  - GATT
  - Interrupt-Driven I/O
  - MIT App Inventor
github: ""
---

## Overview

Developed a reusable Bluetooth Low Energy (BLE) communication framework for AVR microcontrollers using Microchip RN487x BLE modules. The framework provides a bridge between mobile applications and embedded devices, supporting command-driven configuration and bidirectional data exchange over GATT characteristics.

The design focuses on reliable communication while respecting the limited RAM and processing resources of ATmega and ATtiny microcontrollers.

## My contribution

- **BLE driver library:** Designed a custom C++ driver for the Microchip RN487x BLE module, communicating with the module over UART.
- **AT command handling:** Implemented AT command transmission and response parsing to support module configuration and communication workflows.
- **Pairing and bonding:** Implemented the pairing/bonding handshake required to establish a trusted connection between the mobile application and the embedded device.
- **GATT data exchange:** Supported bidirectional GATT characteristic read/write operations for exchanging data between the mobile application and the microcontroller.
- **UART buffering:** Implemented interrupt-driven UART buffering to receive and process serial data without relying entirely on blocking operations.
- **Mobile integration:** Integrated the communication workflow with a mobile application built using MIT App Inventor.

## Engineering decisions

- **Resource-conscious design:** Kept the driver lightweight to suit the limited memory available on AVR devices.
- **Interrupt-driven reception:** Used UART interrupts and buffering to handle incoming data efficiently while allowing the application firmware to continue executing.
- **Reusable abstraction:** Encapsulated BLE module communication and AT command handling in a C++ driver so application code could use a consistent interface.
- **Separation of responsibilities:** Kept UART transport, BLE command handling, and application-level data exchange logically separated to make the framework easier to integrate and maintain.

## Validation

Validated the communication workflow across AVR microcontroller variants, including ATmega and ATtiny devices. Testing covered UART communication with the RN487x module, AT command request/response handling, pairing and bonding, and bidirectional GATT data exchange with the mobile application.

The interrupt-driven UART buffering approach was designed to support responsive communication with a small RAM footprint. Add measured latency, memory usage, or reliability figures here if you have verified test results available.

## What I learned

- **Communication drivers need to handle asynchronous behaviour:** Robust UART and BLE integration requires careful handling of responses, timing, and incoming data rather than assuming each command completes immediately.
- **Reusable drivers must respect hardware constraints:** A clean API is valuable, but on small AVR devices it must be balanced against RAM usage, buffering needs, and non-blocking execution.


