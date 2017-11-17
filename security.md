# Security

## Keypairs 

When launching an instance, a key pair gives you SSH access to your instance. On the Meshpanel, you have to have at least one key pair for each project. If you have not created a security group by yourself, you can just use the default security group for this. The key pair can be used for multiple instances within a Meshproject. If you wish to generate your own key pair using an external tool, it is possible to import it into OpenStack.

A key pair always belongs to an individual user, not to a project. That means that if you would like to share a key pair among multiple users, every single user has to import that key pair.

## Security Groups

A security group is a number of network access rules, which limit access, i.e. traffic to the instances within that security group. Assigning multiple security groups to an instance is possible but it has to have at least one assigned to it. You can use the default security group if you have not yet created your own security group.

The rules of a security group can be edited \(e.g. new rules can be added, old ones removed\). It is also possible to edit the rules of the default security group. These rules specify  through which ports and protocols instances can be accessed \(e.g. through SSH, UDP or DNS\). A rule consists of several parameters:

* **Traffic Source**: Specifying from where IP addresses can access instances \(e.g. from inside the cloud or from outside\).

* **Protocol**: Specifying either TCP for SSH, ICMP for pings, or UDP.

* \*\*Destination Port on the virtual machine: Specifying a port range \(not supported by ICMP, enter values defining the codes and types of ICMP traffic instead\).

Instances within the default security group cannot be accessed by IP addresses outside the cloud. Modify the default security rules to change this. In addition to that, DHCP responses coming from instances will be automatically dropped by security groups. It is also possible to assign a floating IP address to a running instance in order to get access to it from outside the cloud.

