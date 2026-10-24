---
title: "High-Precision Hall Effect Sensor Array for Linear Position Detection"
description: "A six-sensor Hall effect array with AVR-based ADC acquisition and custom signal processing for precise linear position measurement."
number: "03"
order: 3
featured: false
technologies:
  - Embedded C
  - AVR
  - ADC
  - Hall Effect Sensors
  - Signal Processing
  - PCB Design
  - KiCad
github: ""
---

## Overview

Designed and implemented a Hall effect sensing system for detecting linear position across a 30 mm measurement scale. The system combines a custom stacked PCB array of six Hall effect sensors with AVR firmware for multi-channel analog acquisition and position estimation.

The goal was to achieve fine-grained position measurement across the full scale while maintaining consistent magnetic field sampling and minimizing interference between adjacent sensors.

## My contribution

- **Sensor array design:** Designed a stacked PCB arrangement containing six Hall effect sensors distributed across a 30 mm linear scale.
- **PCB layout:** Developed the PCB layout in KiCad, with attention to sensor pitch, placement, and minimizing magnetic crosstalk while maintaining uniform sampling across the measurement range.
- **ADC acquisition firmware:** Implemented multi-channel ADC acquisition on an AVR microcontroller to collect readings from the sensor array.
- **Position estimation:** Developed a custom signal-processing and interpolation algorithm to combine sensor readings and estimate the target's linear position with sub-millimeter resolution.
- **Hardware–firmware integration:** Integrated the sensor PCB and AVR firmware and evaluated position measurements across the full scale.

## Engineering decisions

- **Distributed sensing:** Used multiple Hall effect sensors across the measurement scale to capture changes in the magnetic field as the target moved.
- **Sensor placement:** Optimized the sensor pitch and PCB arrangement to support consistent field sampling and reduce unwanted interaction between adjacent sensing elements.
- **Multi-channel acquisition:** Collected readings from multiple ADC channels so the position estimate could use information from the sensor array rather than relying on a single sensor.
- **Interpolation-based estimation:** Applied custom signal processing and interpolation to estimate positions between sensor locations, improving effective resolution beyond the physical sensor spacing.

## Validation

Evaluated the position-detection system across the 30 mm measurement scale. The sensor array and firmware achieved a reported position accuracy of ±0.3 mm across the full scale.

If available, add details about the reference measurement method, number of test points, repeatability, and environmental conditions to make the validation results easier to reproduce.

## What I learned

- **Sensor geometry is part of the measurement algorithm:** PCB layout and sensor spacing directly influence the quality of the data available to the firmware.
- **Resolution and accuracy are different:** Interpolation can provide fine-grained position estimates, but the final accuracy still depends on sensor behaviour, calibration, noise, and validation against a reference.

