---
id: meshstack.meshmarketplace.metrics-metering
title: Metrics-based Metering
---

> The following functionality is deprecated and we do not recommend using it.
> If you want to import your costs use [our API](https://kraken.dev.meshcloud.io/docs/index.html#_put_meshresourceusagereports) for importing resource usage reports instead.

It is not always the best approach to apply a [fixed periodic fee](meshstack.meshmarketplace.metering.md#osb-api-service-catalog) on a Service Plan. There are usecases where OSB Services have to be charged based on certain metrics. If a service instance has other resources (like virtual machines or storage) attached, charging usage-based via a related metric makes sense. An example would be a `database as a service` (DBaaS) which needs to be charged on the actual storage capacity used, rather than the time the service instance was active.

## Example use cases

The following list provides some examples for metrics-based metering:

- **DBaaS**: A Database-as-a-service where a single instance of the service will have a varying number of VMs running (which is a service instance parameter) and also has backup storage possibility which needs to be charged per GB/hours used.
- **API gateway service**: Number of requests made on that service.
- **Third-Party services**: The service broker might use third party services that provide a custom invoice, which shall be charged to the service consumer. Examples for this are Datadog or MongoDB Atlas.

## Metric types

meshStack supports 3 different types of metrics that can be provided by Service Brokers. Dependening on the use-case it might be possible that multiple metric types fit. You have to decide which one is easier to use in that case.

### Gauges

A gauge is a metric that just delivers a value as it is available at a certain point in time. For example, at `2020-09-05T00:00:00.000Z` two running VMs were observed. Or at `2020-09-11T00:00:00.000Z` 100 GB storage capacity was being consumed.

**Applicable use-cases:**

- Number of virtual machines used by a service instance: The service broker will report a timestamp along with the number of virtual machine instances that were running at that time.
- Number of users registered to use the service instance: The service broker will report a timestamp and the observed registered number of users at that timestamp.
- Hard-disk space used by a service instance: The service broker will report the used hard disk space with a timestamp when this value was observed. In that case it is recommended to use a not too frequent sampling of the metric. A new value would only be provided every hour or every day, as e.g. new values every second would be too fine-grained and result in too much data traffic and processing. If you need this kind of precision for a use-case, better provide a [Periodic Counter](#periodic-counters). That way you can already summarize the metric for a certain period.

The cost for a gauge **must be an HOURLY cost**, for example the hourly cost of a small virtual machine.

For implementation details of a gauge metrics endpoint, please have a look at this [section](#providing-gauges).

### Periodic Counters

A PeriodicCounter can be used to model counts which belong to time periods. For example, between `2020-09-01T00:00:00.000Z` and `2020-09-12T00:00:00.000Z` there were 10,000 API requests.

**Applicable use-cases:**

- The service instance shall be billed with an invoice from a third party. A service broker uses another service in the background like Datadog or MongoDB Atlas. These services will provide invoices by themself and these shall be charged to the consumer of the service.
- Number of API calls done in an API gateway service (assuming the service keeps count in time periods)
- Incoming/outgoing traffic in gigabytes (assuming the service keeps count in time periods)
- Any other scenario where a counter is needed, and counter resets are a possibility. That means it is not an ever increasing counter, but e.g. it is reset monthly. If it is an ever increasing counter, use [Sampling Counters](#sampling-counters) instead.

The cost for a PeriodCounter metric must be the cost per count. For example the cost per API call (or if the service counts API call in thousands, the cost per thousand API calls).

For implementation details of a periodic counter metrics endpoint, please have a look at this [section](#providing-periodic-counters).

### Sampling Counters

A sampling counter can be used to model a counter that reports a count along with a timestamp at which the count was observed. For example, at `2020-09-11T00:00:00.000Z` it was observed that the amount of outgoing traffic was at 105GB.  **The value of a sampling counter should monotonically increase over time. Any counter resets are not handled in meshStack. If you expect counter resets you can use a [Periodic Counter](#periodic-counters) instead.**

In general you can always track sampling counter metrics as periodic counters. But sampling counters might be easier to implement on the service broker side. You don't have to keep track of periods by yourself. This is handled by meshStack for you.

**Applicable usecases:**

- Number of API calls done in an API gateway service (assuming the service samples the count and reports a timestamp and the count at that timestamp)
- Incoming/outgoing traffic in gigabytes (assuming the service samples the gigabyte count and reports a timestamp and the count at that timestamp)
- Any other scenario where a counter is needed, and counter resets are not a possibility

The cost for a SamplingCounter metric must be the cost per count. For example the cost per API call (or if the service counts API calls in thousands, the cost per thousand API calls).

For implementation details of a sampling counter metrics endpoint, please have a look at this [section](#providing-sampling-counters).

## Cost information in Catalog

A service that exposes metrics must define the `metrics` [catalog extension](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#catalog-extensions) defined below. The extension should specify an endpoint URL per metric type it supports (see below for supported metric types).

```json
"metrics": {
  "gauges": "http://example.com/metrics/gauges/$dbaas-service-definition-id",
  "samplingCounters": "http://example.com/metrics/samplingCounters/$dbaas-service-definition-id",
  "periodicCounters": null
}
```

The service should only specify endpoints for the types of metrics that are exposed. So, if a certain service does not expose Periodic Counters, the `periodicCounters` endpoint should be omitted in the service definition.

To associate costs with the different metrics, costs defined in the [OSB Profile](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#cost-object) have to be extended as follows:

```json
"costs": [
  {
    "amount": {
      "eur": 0.002
    },
    "unit": "outgoing_traffic",
    "metricType": "gauge",
    "description": "0.002 EUR per GB"
  }
]
```

- **unit**: Technical name of the metric that will be provided via the [Metrics Endpoint](#metric-endpoints).
- **metricType**: [Type](#metric-types) of this metric (one of `gauge`, `periodic_counter`, `sampling_counter`)
- **description**: The description should fully describe the metric and the cost involved and will be shown to the user in meshPanel as one cost block of the service plan.

### Example Service Definition

The following full example of a service definition in a Service Broker Catalog lists 4 different metrics exposed by the service, namely `outgoing_traffic`, `small_vms`, `requests_total` and `third_party_invoice`.

> After the following catalog example, the service definition id will be shown as `$service-definition-id` in the next sections.

```json
{
  "services": [{
    "name": "example-service",
    "id": "acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
    "description": "A service that uses all metric types.",
    "metrics": {
      "gauges": "https://example.com/metrics/gauges/acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
      "samplingCounters": "https://example.com/metrics/samplingCounters/acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
      "periodicCounters": "https://example.com/metrics/periodicCounters/acb56d7c-XXXX-XXXX-XXXX-feb140a59a66"
    },
    "plans": [
      {
        "id": "489974dd-erew7-40bc-a724-a2026fdb1c",
        "name": "Standard",
        "description": "Standard plan",
        "metadata":{
          "costs": [
            {
              "amount": {
                "eur": 0.002
              },
              "unit": "outgoing_traffic",
              "metricType": "gauge",
              "description": "0.002 EUR per GB outgoing traffic"
            },
            {
              "amount": {
                "eur": 0.003
              },
              "unit": "small_vms",
              "metricType": "gauge",
              "description": "0.003 EUR per hour per VM instance used within the service instance"
            },
            {
              "amount": {
                "eur": 0.00001
              },
              "unit": "requests_total",
              "metricType": "sampling_counter",
              "description": "0.0001 EUR per single HTTP request to the service instance"
            },
          {
              "amount": {
                "eur": 1
              },
              "unit": "third_party_invoice",
              "metricType": "periodic_counter",
              "description": "The cost of usage for third party service"
            }
          ]
        }
      }
    ]
  }]
}
```

## Metric Endpoints

> You have to make sure that the metric endpoints are available reliably. When Tenant Usage Reports are
> finalized, metrics that haven't been received until that point in time for the previous month won't be
> considered in the Usage Reports and Chargeback Statements. Finalization of Usage Reports usually happens
> four days after the end of the month. Please contact your Cloud Foundation team to find out how this offset
> is configured in your meshStack.

### Authentication

All metrics endpoints must authenticate the caller via basic authentication, using the same credentials that were provided when [registering the service broker](meshstack.meshmarketplace.development.md).

### The general response format

An example response is shown below.

```json
{
  "dataPoints": [
      {
         "serviceInstanceId": "766fa866-a950-4b12-adff-c11fa4cf8fdc",
         "resource": "small_vms",
         "values": [
            {
               "writtenAt": "2020-09-02T00:00:00.000Z",
               ...
            },
            {
               "writtenAt": "2020-09-11T00:00:00.000Z",
               ...
            }
         ]
      }
   ],

  "_links" : {
    "next" : {
      "href" : "http://example.com/metrics/gauges/$service-definition-id/1?from=2020-09-01T00:00:00.000Z&to=2020-10-15T00:00:00.000Z"
    }
  }
}
```

The `resource` must match the `unit` defined in the [catalog's `cost` object](#cost-information-in-catalog).

Each of the metrics data points needs a `writtenAt` timestamp which indicates the time at which the data point was written. meshStack will poll the endpoint with query parameters `from` (exclusive) and `to` (inclusive) which are timestamps in the `ISO 8601` format in the UTC timezone (for example, `2020-09-03T10:15:30Z`) and the endpoint should return all new data points where the `writtenAt` timestamp falls into this interval.

meshStack will poll the endpoint to fetch data incrementally based on the `writtenAt` timestamp. This incremental collection ensures that there will be less traffic between meshStack and the service broker. For example the `from` and `to` values could look like the following for consecutive calls.

```json
[2020-09-02T00:00:00.000Z, 2020-09-05T00:00:00.000Z]
[2020-09-05T00:00:00.000Z, 2020-09-05T10:00:00.000Z]
[2020-09-05T10:00:00.000Z, 2020-09-07T00:00:00.000Z]
```

### Pagination

If you expect there to be large amounts of data, you have the option of implementing pagination, in which case you can specify the `next` link as shown in [the general response format](#the-general-response-format). If the page is the only or last page you should not send a next link (that is, the `_links` section should not contain a `next` attribute) and meshStack will assume that there is no more data to retrieve from the service broker for the given period.

If you do implement pagination, then each of the pages that have a following page should contain the next link. One option to implement pagination would be to return data up to a certain writtenAt timestamp and set the `next` link's `from` value to that timestamp. Another option is to apply page numbers to the `next` link. meshStack will simply use the provided `next` link to request the next page. So you can apply whatever kind of paging fits best for you.

### Providing Gauges

For a description of what gauges are and can be used for see [this section](#gauges). A gauge will contain a timestamp and the value of the observation at that timestamp.

The `gauges` endpoint should return a response as shown below.

`/metrics/gauges/$service-definition-id?from=2020-09-01T00:00:00.000Z&to=2020-10-15T00:00:00.000Z`

```json
{
   "dataPoints": [
      {
         "serviceInstanceId": "766fa866-a950-4b12-adff-c11fa4cf8fdc",
         "resource": "small_vms",
         "values": [
            {
               "writtenAt": "2020-09-02T00:00:00.000Z",
               "observedAt": "2020-09-01T00:00:00.000Z",
               "value": 2
            },
            {
               "writtenAt": "2020-09-11T00:00:00.000Z",
               "observedAt": "2020-09-10T00:00:00.000Z",
               "value": 3
            },
            {
               "writtenAt": "2020-10-02T00:00:00.000Z",
               "observedAt": "2020-10-01T00:00:00.000Z",
               "value": 2
            },
            {
               "writtenAt": "2020-10-11T00:00:00.000Z",
               "observedAt": "2020-10-10T00:00:00.000Z",
               "value": 2
            }
         ]
      }

   ]
}
```

Any data points that have the exact same `observedAt` timestamp will be overwritten with the new values and any data points with an `observedAt` timestamp which meshStack has not yet retrieved will be inserted in meshStack. With this overwriting functionality, you have the option of correcting the past month's data points. This is possible until the usage reports for the past month are finalized.

To calculate the cost of usage, the `value` will be multiplied by the number of hours the value was observed (the number of hours will be calculated by meshStack based on the `observedAt` timestamp) and then will be multiplied by the cost defined in the [service definition](#cost-information-in-catalog).

Taking the [example service definition](#example-service-definition) and the example response shown above, the cost calculation for the service instance with id `766fa866-a950-4b12-adff-c11fa4cf8fdc` will be as follows. (Assuming that today's date is 2020-10-13)

In the usage report of September:

`( 2 * 10 (days) * 24 (hours) + 3 * 20 (days) * 24 (hours) ) * 0.003 € = 5.76 €` will be charged for the `vm-small` metric.

In the usage report for October (so far):

`2 * 10 (days) * 24 (hours) * 0.003 € = 1.44 €` will appear against the `vm-small` metric

### Providing Periodic Counters

For a description of what periodic counters are and can be used for see [this section](#periodic-counters). A PeriodicCounter can be used to model counts which belong to time periods. For example, between `2020-09-01T00:00:00.000Z` and `2020-09-12T00:00:00.000Z` there were 10,000 API requests.

The `metrics/periodicCounters/$service-definition-id` endpoint should return a response as shown below.

`/metrics/periodicCounters/$service-definition-id?from=2020-09-01T00:00:00.000Z&to=2020-10-13T00:00:00.000Z`

```json
{
   "dataPoints": [
      {
         "serviceInstanceId": "166fa866-a950-4b12-adff-c11fa4cf8fdc",
         "resource": "third_party_invoice",
         "values": [
            {
               "writtenAt": "2020-10-02T00:00:00.000Z",
               "periodStart": "2020-09-01T00:00:00.000Z",
               "periodEnd": "2020-10-01T00:00:00.000Z",
               "countedValue": 300
            },
            {
               "writtenAt": "2020-10-13T00:00:00.000Z",
               "periodStart": "2020-10-01T00:00:00.000Z",
               "periodEnd": "2020-11-01T00:00:00.000Z",
               "countedValue": 30
            }
         ]
      },
      {
         "serviceInstanceId": "166fa866-a950-4b12-adff-c11fa4cf8fdc",
         "resource": "requests_total",
         "values": [
            {
               "writtenAt": "2020-09-13T00:00:00.000Z",
               "periodStart": "2020-09-01T00:00:00.000Z",
               "periodEnd": "2020-09-12T00:00:00.000Z",
               "countedValue": 200
            },
            {
               "writtenAt": "2020-09-29T00:00:00.000Z",
               "periodStart": "2020-09-12T00:00:00.000Z",
               "periodEnd": "2020-09-28T00:00:00.000Z",
               "countedValue": 700
            },
            {
               "writtenAt": "2020-10-05T05:00:00.000Z",
               "periodStart": "2020-09-28T00:00:00.000Z",
               "periodEnd": "2020-10-05T00:00:00.000Z",
               "countedValue": 150
            }
         ]
      }
   ]
}
```

**Note that the `periodEnd` will decide which reporting period a count will belong to.** For example if there is a counter period that goes from 27-09-2020 to 06-10-2020, that count will belong to the reporting period of October and will appear in the usage reports for period `01-10-2020 00:00 - 01-11-2020 00:00`. In other words, if the periodEnd is a timestamp that is later than the end of the reporting period, that count will go in the next reporting period.

Any data points that have the exact same periodStart and periodEnd timestamps will be overwritten with the new values and any data points with periodStart and periodEnd timestamps which meshStack has not yet retrieved will be inserted in meshStack. With this overwriting functionality, you have the option of correcting the past month's data points until the usage reports for the past month are finalized.

Taking the [example service definition](#example-service-definition) and the example response shown above, the cost calculation for the service instance with id `166fa866-a950-4b12-adff-c11fa4cf8fdc` will be as follows. (Assuming that today's date is 2020-10-13)

In the usage report of September,

- `300 * 1 € = 300 €` will be charged for the `mongodb-atlas-bill`
- `(200 + 700) * 0.00001 € = 0.009 €` will be charged for the `requests_total` metric

In the usage report for October (so far)

- `30 * 1 € = 30 €` will appear against the metric `mongodb-atlas-bill`
- `150 * 0.00001 € = 0.0015 €` will appear against the `requests_total` metric

> Please make sure to never provide overlapping periods. It is not possible to charge multiple datapoints that cover partially the same timeframe.

An important thing to note when using Periodic Counters is that if you choose to change already sent data to make corrections, the periodStart and periodEnd timestamps should match exactly to the data points that were already sent. For example, if the following data has already been sent

```json
 {
    "writtenAt" : "2020-09-29T00:00:00.000Z",
    "periodStart": "2020-09-12T00:00:00.000Z",
    "periodEnd": "2020-09-28T00:00:00.000Z",
    "countedValue": 700
  },
  {
    "writtenAt": "2020-10-06T00:00:00.000Z",
    "periodStart": "2020-09-28T00:00:00.000Z",
    "periodEnd": "2020-10-05T00:00:00.000Z",
    "countedValue": 150
  }
```

a subsequent call should **not** contain a period that spans both of the above periods, for example.

```json
{
  "writtenAt": "2020-10-06T05:00:00.000Z",
  "periodStart": "2020-09-20T00:00:00.000Z",
  "periodEnd": "2020-10-03T00:00:00.000Z",
  "countedValue": 700
}
```

This is because there is no logical way to merge the previously seen data and the new data point. You have to provide the 2 data points again with the new values instead.

### Providing Sampling Counters

A sampling counter can be used to model a counter that reports a count along with a timestamp at which the count was observed. For example, at `2020-09-11T00:00:00.000Z` it was observed that the amount of outgoing traffic was at 105GB.  **The value of a sampling counter should monotonically increase over time. Any counter resets are not handled in meshStack. If you expect counter resets you can use a [PeriodicCounter](#providing-periodic-counters) instead.**

Applicable usecases

- Number of API calls done in an API gateway service (assuming the service samples the count and reports a timestamp and the count at that timestamp)
- Incoming/outgoing traffic in gigabytes  (assuming the service samples the gigabyte count and reports a timestamp and the count at that timestamp)
- Any other scenario where a counter is needed, and counter resets are not a possibility

The cost for a SamplingCounter metric must be the cost per count. For example the cost per API call (or if the service counts API call in thousands, the cost per thousand API calls).

The `metrics/samplingCounters/$service-definition-id` endpoint should return a response as shown below.

`/metrics/samplingCounters/$service-definition-id?from=2020-09-01T00:00:00.000Z&to=2020-10-13T00:00:00.000Z`

```json
{
   "dataPoints": [
      {
         "serviceInstanceId": "266fa866-a950-4b12-adff-c11fa4cf8fdc",
         "resource": "outgoing_traffic",
         "values": [
            {
               "writtenAt": "2020-09-01T00:00:00.000Z",
               "observedAt": "2020-09-00T00:00:00.000Z",
               "value": 200
            },
            {
               "writtenAt": "2020-09-11T00:00:00.000Z",
               "observedAt": "2020-09-10T00:00:00.000Z",
               "value": 300
            },
            {
               "writtenAt": "2020-10-02T00:00:00.000Z",
               "observedAt": "2020-10-01T00:00:00.000Z",
               "value": 500
            },
            {
               "writtenAt": "2020-10-11T00:00:00.000Z",
               "observedAt": "2020-10-10T00:00:00.000Z",
               "value": 700
            }
         ]
      }
   ]
}
```

When calculating the cost for a reporting period, we will subtract the counter value at the beginning of the reporting period from the value at the end of the reporting period and multiply by the cost per unit. **We recommend that you sample the counter daily or hourly so that we can build incremental usage reports based on the data that is sent.** The advantage of using a `SamplingCounter` over a `PeriodicCounter` is that all calculations happen in meshStack and you only need to keep track of the metric values and the timestamps at which the values were observed.

Any data points that have the exact same observedAt timestamp will be overwritten with the new values and any data points with an observedAt timestamp which meshStack has not yet retrieved will be inserted in meshStack. With this overwriting functionality, you have the option of correcting the past month's data points until the usage reports for the past month are finalized.

Taking the [example service definition](#example-service-definition) and the example response shown above, the cost calculation for the service instance with id `266fa866-a950-4b12-adff-c11fa4cf8fdc` will be as follows. (Assuming that today's date is 2020-10-13)

In the usage report of September,

`(500 - 200) * 0.002 € = 0.6 €` will be charged for the `outgoing_traffic` metric

In the usage report for October (so far)

`(700 - 500) * 0.002 € = 0.4 €` will appear against the `outgoing_traffic` metric
