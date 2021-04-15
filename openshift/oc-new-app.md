# OpenShift
Walkthrough of building the app from source and deploying to an OpenShift cluster using the `oc new-app` process.

## 1. OpenShift Cluster
First login to your OpenShift cluster
- if you are using OpenShift on cloud provider account then login to that e.g. `ic login --sso` for corporate login to an IBM Cloud account
- login to your OpenShift cluster (`oc login`) e.g. if deploying to a cloud account provider then this might use OAuth Token Request details

## 2. Create the Deployment
The simple `hello-node` app in [repo](https://github.com/cg2p/hello-node) is a web app lisenting on port 3000 
```
# Create a new project
oc new-project hello-node

# not using nodejs~https://github.com/cg2p/hello-node.git
# detects EXPOSE in Dockerfile and sets Target Port in Route (which is the port the app in container is lisenting on)
oc new-app https://github.com/cg2p/hello-node.git

# creates the following:
# Namespace = hello-node (Kubenetes spec)
# Service = hello-node (Kubernetes spec)
# Deployment Config = hello-node (OpenShift spec)
# plus OpenShift spins up the pods, and creates necessary ConfigMaps (Kubernetes spec)
```

## 3. Expose access to the app
If the Dockerfile has EXPOSE set, then the `oc new-app` build and deploy detects and the Service/hello-node will load balance against that exposed port (which is what the NodeJS server code is listening on).

EXPOSE is not mandatory but helps setup for inter-container communication, but also serves as a description that processes like `oc new-app` can use to generate the deploymeny.

If the Dockerfile EXPOSE is not set then
```
# if Dockerfile EXPOSE is NOT set then
oc expose dc/hello-node --port=3000
```

Now create a Route to expose the Service/hello-node
```
# --name sets the name of the Route that is created
# Route = hello-node-route (OpenShift spec)
oc expose svc/hello-node --name=hello-node-route 
```

Then get the URL the service is available on
```
oc status 
```

Returns the URL of the exposed app to call via browser or curl
```
> In project hello-node on server https://url-of-your-openshift-cluster

> http://url-of-the-route-to-your-app to pod port 3000-tcp (svc/hello-node)
  dc/hello-node deploys istag/hello-node:latest <-
    bc/hello-node docker builds https://github.com/cg2p/hello-node.git on istag/node:10-alpine 
    deployment #1 deployed 6 minutes ago - 1 pod

curl http://url-of-the-route-to-your-app 

> Hello World !
```

## 4. Templates
A basic NodeJS OpenShift template. The app server looks for two environment variables:
- MYVISIBLEVAR is set on the `oc new-app` build and deploy action.
- MYSECRETVAR is set via the kubernetes Secret

The secret is created and applied to the DeploymentConfig causing the pods to restart and pick up the Secret and then the env var.
```
oc new-project hello2
oc new-app -f ./hello-node-template.json \
    -p NAME=hello2 -p MYVISIBLEVAR=amazing -p SERVER_PORT=3000
oc create secret generic hello2-secret --from-literal=MYSECRETVAR=MyBigSecret
oc set env --from=secret/hello2-secret dc/hello2
```

## `oc new-app` build strategy

1. Type of Build - Source or Docker
if new-app finds a Dockerfile, then build strategy is Docker
a Docker build strategy invokes plain Docker build



`--strategy=: Specify the build strategy to use if you don't want to detect (docker|source)` (note: pipepline option is deprecated)

oc new-project hello-node
oc new-app https://github.com/cg2p/hello-node.git --strategy=source

--> Found image 302af44 (6 weeks old) in image stream "openshift/nodejs" under tag "14-ubi8" for "nodejs"

    Node.js 14 
    ---------- 
    Node.js 14 available as container is a base platform for building and running various Node.js 14 applications and frameworks. Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

    Tags: builder, nodejs, nodejs14

    * The source repository appears to match: nodejs
    * A source build using source code from https://github.com/cg2p/hello-node.git will be created
      * The resulting image will be pushed to image stream tag "hello-node:latest"
      * Use 'oc start-build' to trigger a new build

--> Creating resources ...
    imagestream.image.openshift.io "hello-node" created
    buildconfig.build.openshift.io "hello-node" created
    deployment.apps "hello-node" created
    service "hello-node" created
--> Success
    Build scheduled, use 'oc logs -f buildconfig/hello-node' to track its progress.
    Application is not exposed. You can expose services to the outside world by executing one or more of the commands below:
     'oc expose service/hello-node' 
    Run 'oc status' to view your app.



## References
Example template file for `oc new-app` for [Node and Mongo app](https://github.com/openshift/origin/blob/master/examples/quickstarts/nodejs-mongodb.json)

[Main samples repo](https://github.com/sclorg/nodejs-ex/blob/master/openshift/templates/nodejs.json) for basic Node all from Red Hat

Back level, but explains concepts [article on template development](http://v1.uncontained.io/playbooks/fundamentals/template_development_guide.html)

