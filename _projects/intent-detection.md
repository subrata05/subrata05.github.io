---
title: "Real-Time Intent Detection"
description: "A signal-processing pipeline for detecting user intent from force-sensor data in a timed embedded system."
number: "02"
order: 2
featured: true
technologies:
  - Embedded C
  - EMA filters
  - Timers
  - State machines
  - Serial plotting
github: ""
---

## Overview

Explain what the signal represents, what the system must detect, and what makes the detection problem difficult.

## Design

Describe the signal-processing pipeline, including any fast and slow exponential moving averages, thresholds, baseline learning, or statistical measures you used.

## Timing and architecture

Explain how sampling, timer callbacks, processing stages, and output events are separated. Include a timing diagram if it helps readers understand the design.

## Testing and observations

Describe how you generated test data, observed signals, tuned parameters, and checked false triggers or missed detections. Add plots or measurements only when you have verified them.

## Lessons learned

What did you learn about filtering, thresholds, timing, or testing algorithms on embedded targets?
