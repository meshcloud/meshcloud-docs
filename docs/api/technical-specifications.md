---
id: technical-specifications
title: Technical Specifications
---

This section describes technical details of the meshStack API, such as the exact data types it provides or HTTP specifics.

## HTTP Verbs

meshStack tries to adhere as closely as possible to standard HTTP and REST conventions in its use of HTTP verbs.

| **Verb** | **Usage**                                                      |
|----------|----------------------------------------------------------------|
| `GET`    | Used to retrieve a resource                                    |
| `POST`   | Used to create a new resource                                  |
| `PATCH`  | Used to update an existing resource, including partial updates |
| `PUT`    | Used to update an existing resource, full updates only         |
| `DELETE` | Used to delete an existing resource                            |

## HTTP Status Codes

meshStack tries to adhere as closely as possible to standard HTTP and REST conventions in its use of HTTP status codes.

| Status Code        | Usage                                                                                                                                                                                                                                                                                                                |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `200 OK`           | Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action. |
| `201 Created`      | The request has been fulfilled and resulted in a new resource being created.                                                                                                                                                                                                                                         |
| `204 No Content`   | The server successfully processed the request, but is not returning any content.                                                                                                                                                                                                                                     |
| `400 Bad Request`  | The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).                                                                                                           |
| `401 Unauthorized` | The server cannot authorize the request. Check the Basic Auth credentials used for the request.                                                                                                                                                                                                                      |
| `403 Forbidden`    | The request is not allowed for the authorized user.                                                                                                                                                                                                                                                                  |
| `404 Not Found`    | The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.                                                                                                                                                                               |
| `409 Conflict`     | The request leads to a conflict. A resource or a unique identifier used in the request already exists.                                                                                                                                                                                                               |

## Data Types

- Dates are usually handled as UTC dates and formatted to ISO 8601 standard (e.g. `2020-12-22T09:37:43Z`).
  A few endpoints use a shorter date format. Please check the per-endpoint documentation for more details.
- String fields are usually limited to 255 characters.

## Hypermedia

meshStack uses [hypermedia](https://en.wikipedia.org/wiki/HATEOAS). Resources include links to other resources in
their responses. Responses are in [Hypertext Application Language (HAL)](https://github.com/mikekelly/hal_specification)
format. Links can be found beneath the `_links` key. Users of the API should not create URIs themselves, instead they
should use the above-described links to navigate from resource to resource.

Notice that HAL hrefs can be templated: For example, if an endpoint requires a path variable, the `_links` array may
include an entry like the following:

```json
{
  "_links" : {
    "users" : {
      "href" : "https://example-url.org/api/users/{username}",
      "templated" : true
    }
  }
}
```

Please refer to the HAL specification for more details about template URIs.

## Versioning

meshStack's meshObject API uses custom media types in the `Accept` and `Content-Type` headers for versioning.

> **Note**
> meshObject API versions each resource like `meshWorkspace` or `meshProject` **individually**. This means you need to
> specify the specific media type corresponding to the endpoint you are calling.

For example, when meshStack introduces a new version of the `meshWorkspace` resource, this has no effect on other
resources like the `meshProject`. This allows the API to evolve in a granular way.

API clients must always set an `Accept` header with the explicitly versioned resource media type. meshObject API will
reject requests without an `Accept` header using a `406 Not Acceptable` status code. The correct media type required
for a resource is described in the corresponding Resource section in this documentation. For example, this is the media
type required to access the `v1` version of a `meshWorkspace` resource:

```
Accept: application/vnd.meshcloud.api.meshworkspace.v1.hal+json
```

Requests that need to send a body like `POST` or `PUT` must also set the `Content-Type` header with the correct media
type. For example, this is the media type required to POST a `meshProject`:

```
Content-Type: application/vnd.meshcloud.api.meshproject.v2.hal+json
```

If a request contains a body and you specify an unsupported or unversioned `Content-Type` like `application/json`, the
endpoint will return an error.

> **Note**
> Endpoints that are documented as `preview` endpoints in this documentation are subject to change and we are planning
> to introduce a new version *without support for backwards compatibility*, meaning, the preview version will disappear
> without prior notice!
>
> These endpoints have a media type with a `-preview` suffix
> (for example, `application/vnd.meshcloud.api.meshbuildingblock.v2-preview.hal+json`).
>
> You are free to try those endpoints out, but we recommend to wait until the final (non-preview) endpoints are released
> before you integrate such endpoints with your infrastructure.

## Deprecation Policy

As we introduce new features and enhance existing functionalities, some API endpoints may become obsolete or outdated.
Deprecating old endpoints is important to ensure the health and maintainability of the API.

Explicit [versioning](#versioning) provides API clients time to transition to newer versions of endpoints in a
controlled manner.

Deprecation follows a phased approach:

- **outdated**: As soon as a new version of an endpoint becomes available, the old version is considered outdated but
  remains fully functional. API clients are advised to migrate to newer versions at their earliest convenience.
- **deprecated**: We have announced an end of life (EoL) date when the endpoint will be removed from the API. API
  clients must migrate to newer versions before this date. Until this date, the endpoint remains fully functional.
- **retired**: After the scheduled removal date, the endpoint is removed from the API and no longer available in
  meshStack. API clients using the old endpoint will receive an HTTP 406, HTTP 415 or HTTP 404 response as appropriate
  for the request.

Please refer to the [Deprecated Resources](pathname:///api/index.html#deprecated-resources) section for a list of deprecated and outdated endpoints.

## Rate Limiting

meshStack APIs are designed to handle a large volume of requests while maintaining optimal performance.

To ensure optimal performance and avoid rate limits in your meshStack instance, please follow these best practices:

- Use responsible pagination to limit the number of results returned in each response. This reduces the amount of data
  that needs to be transferred and processed.
- Apply filters to limit the number of data requested to your specific use case.
- The API may enforce rate limits and respond to requests with HTTP 429 (Too Many Requests). To prevent running into
  rate limits, clients are advised to process only a single request at a time per API key.

By adhering to these best practices, you can ensure that the API can handle your requests efficiently. If you have any
questions or concerns about API performance, please contact the support team for assistance.

## Common Data Formats

This section describes common data formats that are used across different endpoints.

## Paging

Paged list endpoints support two request parameters for pagination: `page` and `size`.

| Parameter | Description                                                                                                                                            |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `page`    | The number of the page you want to retrieve (default = 0).                                                                                             |
| `size`    | The amount of elements in a single page (default = 20). **Note:** You can size up to 1000. Greater values will be automatically lowered to this value. |

Responses are structured like the following snippet:

```json
{
    "_embedded": { },
    "_links": {
        "self" : {
          "href" : "https://mesh-backend-url/api/meshobjects/meshworkspaces"
        },
        "first" : {
          "href" : "https://mesh-backend-url/api/meshobjects/meshworkspaces?page=0&size=20"
        },
        "prev" : {
          "href" : "https://mesh-backend-url/api/meshobjects/meshworkspaces?page=0&size=20"
        },
        "next" : {
          "href" : "https://mesh-backend-url/api/meshobjects/meshworkspaces?page=2&size=20"
        },
        "last" : {
          "href" : "https://mesh-backend-url/api/meshobjects/meshworkspaces?page=3&size=20"
        }
    },
    "page": {
        "size": 20,
        "totalElements": 64,
        "totalPages": 4,
        "number": 0
    }
}
```

The above example is taken from the meshWorkspace list endpoint. All relevant paging information is provided in the `page` element. In addition, links to the first, next (if exists), previous (if exists), and last page are provided. *Pagination links are only provided if there is more than one page available for the given pagination parameters.*

## Tags

meshObjects can be tagged. The tags are provided as key/value pairs where a key can have multiple values. A tag value is always in the form of a list, regardless of the number of values present.

An example could look like this:

```json
{
  "tags": {
    "environment": [
      "Dev",
      "QA"
    ],
    "confidentiality": [
      "Internal"
    ]
  }
}
```
