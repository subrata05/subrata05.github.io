---
title: "RTOS-Based Sensor Monitor"
description: "A planned portfolio project exploring task scheduling, queues, timing, and robust sensor monitoring."
number: "04"
order: 4
featured: false
technologies:
  - C
  - FreeRTOS
  - STM32
  - UART
  - Testing
github: ""
---

## Project status

This is a project brief/template. Update it after you have implemented and tested the system; do not present planned features as completed work.

## Proposed goals

- Read sensor data at a defined sampling rate.
- Separate acquisition, processing, and reporting into tasks.
- Pass samples through a queue with explicit handling for queue overflow.
- Use a watchdog and report system health.
- Log data over UART without blocking time-critical work.

## What to document after implementation

Explain task priorities, stack sizing, synchronization choices, timing measurements, error handling, and how you tested the system under load.
