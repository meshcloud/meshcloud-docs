# Security

When you launch a virtual machine, you can inject akey pair, which provides SSH access to your instance. For this to work, the image must contain thecloud-initpackage.

You can create at least one key pair for each project. You can use the key pair for multiple instances that belong to that project. If you generate a key pair with an external tool, you can import it into OpenStack.

_NOTE:_A key pair belongs to an individual user, not to a project. To share a key pair across multiple users, each user needs to import that key pair.

If an image uses a static root password or a static key set \(neither is recommended\), you must not provide a key pair when you launch the instance.

Asecurity groupis a named collection of network access rules that are use to limit the types of traffic that have access to instances. When you launch an instance, you can assign one or more security groups to it. If you do not create security groups, new instances are automatically assigned to the default security group, unless you explicitly specify a different security group.

The associatedrulesin each security group control the traffic to instances in the group. Any incoming traffic that is not matched by a rule is denied access by default. You can add rules to or remove rules from a security group, and you can modify rules for the default and any other security group.

You can modify the rules in a security group to allow access to instances through different ports and protocols. For example, you can modify rules to allow access to instances through SSH, to ping instances, or to allow UDP traffic; for example, for a DNS server running on an instance. You specify the following parameters for rules:

* Source of traffic. Enable traffic to instances from either IP addresses inside the cloud from other group members or from all IP addresses.

* Protocol. Choose TCP for SSH, ICMP for pings, or UDP.

* Destination port on virtual machine. Define a port range. To open a single port only, enter the same value twice. ICMP does not support ports; instead, you enter values to define the codes and types of ICMP traffic to be allowed.

Rules are automatically enforced as soon as you create or modify them.

_NOTE:_Instances that use the default security group cannot, by default, be accessed from any IP address outside of the cloud. If you want those IP addresses to access the instances, you must modify the rules for the default security group. Additionally, security groups will automatically drop DHCP responses coming from instances.

You can also assign a floating IP address to a running instance to make it accessible from outside the cloud. See .



