# Services

Services on our PaaS offering enable application developers to easily bind their applications to Databases, Document Stores, Queuing and other backend Services.

Our platform differentiates between several Services types:

* Platform Services
* User Provided Services

## Platform Services

Meshcloud offers a marketplace of services, from which users can provision reserved resources on-demand. Platform Services include Database Services like MariaDB \(MySQL\), MongoDB, RabbitMQ and many more. Meshcloud offers different flavors of Platform Services, from small for testing and development, over dedicated up to clustered. The different types of service can be identified by:

* S - Shared Service on a Cluster with a limited amount of storage and connections
* D - Dedicated Service on a single VM, with the VM being the limitation of storage and connections
* DC - Dedicated Cluster Service, deployed on multiple VM for high availability and fault tolerance of your data

## User Provided Services

User-provided service instances enable developers to use services that are not available in the marketplace with their applications running on Meshcloud PaaS.

They enable application developers to use the credentials of a Service deployed in Meshcloud IaaS, or 3rd party service being used as if they were "native" Platform Services.

