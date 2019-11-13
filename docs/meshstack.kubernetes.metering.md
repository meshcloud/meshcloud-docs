---
id: meshstack.kubernetes.metering
title: Metering
---

meshStack supports metering and billing for most common Kubernetes versions.

## Prerequisites

- The "meshfed-metering" service account must be configured as described [here](./meshstack.kubernetes.index.md#metering)
- CPU and memory limits have to be defined for all containers, as metering is currently based on these limits
- Kubernetes APIs are accessible by meshStack metering collector components

## Supported Resources

Currently Kubernetes metering is based on Pods. They are metered via the configured limit of CPU and memory of their containers.
