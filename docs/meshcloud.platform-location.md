---
id: meshcloud.platform-location
title: Platforms & Locations
---

At the heart of a meshcloud are the cloud platforms that provide cloud services and resources to users.

## meshPlatforms

The following terms relate to cloud platforms:

- platform-type describes the type of a cloud platform, e.g. OpenStack, Cloud Foundry or AWS.
- meshPlatform to describe a particular deployment of such a cloud platform.

For example, meshstack can manage two, fully isolated OpenStack deployments located in different
geographies in the same meshcloud. While they are both of the same platform-type OpenStack, they each
are individual meshPlatforms.

## Locations

In a meshcloud, cloud meshPlatforms can be grouped by **Location**.
Locations are free-form but they are typically used to help users identify the geographic datacenter
location as well as identify the party that is responsible for managing the cloud meshPlatforms
in this location. For example, this could be an internal IT division that manages private clouds or
an external service provider.

## Using Platforms and Locations

Users can configure which locations their [Projects](meshcloud.project.md) are enabled to use.
A project is able to use and access all meshPlatforms contained in these locations. The locations and meshPlatforms available to your projects are governed by [access policies](meshstack.platform-location.md) configured by your [meshStack operator](meshstack.index.md).
