---
title: "IoT-Based PPG & HRV Monitoring"
description: "ESP32-based cardiovascular signal processing and HRV analysis for cuffless blood pressure estimation, with real-time IoT telemetry and visualization."
number: "01"
order: 1
featured: true
technologies:
  - Embedded C/C++
  - ESP32
  - Digital Signal Processing
  - HRV Analysis
  - Linear Regression
  - MQTT
  - Node.js
  - MySQL
  - ECharts
github: ""
---

## Overview

Developed an IoT-assisted cardiovascular health monitoring system that processes photoplethysmography (PPG) signals to extract heart rate variability (HRV) features and estimate systolic and diastolic blood pressure.

The system combines embedded signal acquisition, digital filtering, cardiovascular feature extraction, and regression-based estimation with an MQTT telemetry pipeline for real-time monitoring and historical data analysis.

## My contribution

- **Signal acquisition and conditioning:** Designed an analog front end using an RC low-pass filter and MCP6001 operational amplifier with an APDS-9008 photodiode, interfaced with the ESP32 for PPG acquisition.
- **Embedded signal processing:** Implemented a third-order IIR bandpass filter and ADC signal normalization to improve the quality and consistency of the acquired PPG waveform.
- **Peak detection and HRV extraction:** Developed threshold-based systolic peak detection and a custom offset-window algorithm to identify diastolic peaks. Derived systolic-to-systolic (SS) intervals and extracted four HRV features: mean SS interval, SDSS, RMSSD, and zero-crossing count.
- **Blood pressure estimation:** Applied a CWLS-based multivariable linear regression model using the extracted HRV features to estimate systolic and diastolic blood pressure.
- **IoT telemetry and visualization:** Integrated MQTT-based Wi-Fi communication with a Node.js backend, Socket.IO, and a MySQL database. Developed a web dashboard using ECharts for real-time signal visualization and historical data analysis.

## Engineering decisions

- **Hybrid signal processing:** Combined analog signal conditioning with digital filtering to address signal noise at different stages of acquisition and processing.
- **Custom peak detection:** Used a threshold-based approach for systolic peaks and an offset-window method for detecting smaller diastolic peaks, accounting for their relative positions in the sampled waveform.
- **Feature-based estimation:** Used four time-domain HRV features as inputs to a multivariable regression model rather than relying on a single interval measurement.
- **Decoupled telemetry:** Used MQTT for sensor-data transmission and a separate backend for data handling, persistence, and visualization, keeping embedded acquisition independent of the dashboard.

## Validation

Evaluated the blood pressure estimation model against reference sphygmomanometer measurements collected from 15 subjects.

The model achieved less than 5% error for most tested subjects, with observed errors varying across subjects and measurements. The system also supported real-time PPG and HRV telemetry through an MQTT-based pipeline, with measurements stored in MySQL for subsequent analysis.

*Note: The reported error describes the results of this project's evaluation and should not be interpreted as clinical validation or evidence of medical-grade accuracy.*

## What I learned

- **Signal quality determines downstream accuracy:** Reliable peak detection and meaningful HRV features depend on consistent signal acquisition, filtering, and handling of noisy measurements.
- **Embedded intelligence benefits from system-level design:** Integrating signal processing, estimation algorithms, communication, and visualization requires careful coordination between resource-constrained firmware and higher-level software components.

> This project demonstrates embedded signal processing and experimental blood pressure estimation. The implementation and evaluation are research-oriented and are not intended to establish clinical accuracy.
