---
id: openstack.compute
title: Virtual Machines
---

The compute service of Meshcloud enables you to create instances of different flavors \(different configurations of vCPUs, vRAM and storage\).


## Connecting a VM to the internet

### 1. Create a Keypair

Go to “Project” -&gt; “Keypairs” and press “Create” in order to create a new SSH key pair. Type in a name for your keypair and click “Create”. An automatic download will start to provide you with your keyfile which will be named accordingly. In case the download does not start automatically, please use the static link also given on the page to download the file. Do not delete the file or change its name and keep it safe as it contains your private key.

### 2. Create a Network

Go to “Networks” and click “Create Network” to create a new network. Type in a name for it and press “Save”. Press “New Subnet” to create a new subnet for your network. Name your subnet, fill in the already given IP-address suggested after “e.g.” and press “Create”.

### 3. Create a Security Group

If you want to access your instance via SSH you should create a new security group. Go to "Security Groups" and click "Create Security Group" to create a new security group. Type in a name for it and press "Save". Now you can edit the fire wall rules for your security group. Make sure to open Port 22 in your newly created securits group for SSH requests.

### 4. Create an Instance

1. Go to "Instances” and click “Create Instance” to create your virtual machine \(VM\). Fill in a name for your VM, choose the flavor of it \(click on the wished size to indicate your choice\) and select the keypair you just created \(click on it\). Then press “Next”.
2. Select your preferred image \(click on it\) and press “Next”.
3. After that you have to select the network you just created \(click on it\) and press “Next”.
4. To complete the creation of your VM, choose the newly created security group by clicking on it and press “Create Instance”.

### 5. Create a floating IP

Now you have to create a floating IP. For this, you need to got to “Floating IPs” and choose the “public00” as external net. After that, press the “+” sign. Write down the newly created floating IP \(not the “Assigned Fixed IP”\).

### 6. Create a Router

Go to “Routers” in order to create a new router. Provide a name for it and select “publi00” as network and click the “+” sign. Choose the subnet you just created as subnet interface for your router and click the “+” sign again.

### 7. Assign your floating IP to your Instance

Go back to “Instances” and assign the floating IP you just created to your instance by clicking on the pencil symbol first and then on the globe symbol. Select the floating IP you just created and press the “+”-sign.  
 You can now access your VM via SSH.

### 8. SSH to your newly created VM

We configured the virtual machine in a way that enables you to connect via SSH. To do so, in your Terminal type `ssh -i [PATHTOYOURPRIVATEKEY] ubuntu@[YOURFLOATINGIP]`. If you are on Windows you can use a tool like PuTTY or the git bash to access your VM via ssh.



