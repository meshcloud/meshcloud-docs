---
id: administration.landing-zones
title: Landing Zones
---

Landing Zones can be configured per platform instance. They relate to a "bootstrap" configuration in the platform instance, that sets
up and configures the cloud tenant according to policies and requirements of your company. E.g. specific networks or region restrictions
can be configured via these landing zones. Multiple Landing Zones can be defined per platform instance, which allows e.g. different setups
for a Dev, QA and Production stage.

## Supported Platforms

Currently the following platforms are supported for landing zone configuration in meshStack.

### Azure

In Azure, a landing zone is defined via a management group the subscription for the project will be assigned to. Policies can be applied
to these management groups. Optionally a blueprint can also be defined. Via an Azure Blueprint default resources can be deployed to the
subscription and additional specific policies can be defined. A blueprint can be configured to decline users to change or delete the
resources and policies created by the blueprint.

## Disabled Landing Zones
Disabled Landing Zones can't be assigned to projects anymore. If the Landing Zone has already been assigned to a project,
this assignment will remain.
