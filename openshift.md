# exploration tests for portable deployment to OpenShift

##
```
docker build -t hello-node:1.0 .
```
now prove that we are not running the dev command line version which is the app listening on port 3000
now we are running the container, expose port 3000 of the app running inside the container
and expose it to the local machine via port 3001
```
docker run -p 3001:3000 --detach --name hello-node hello-node:1.0
```
test http://localhost:3001

## `oc new-app` process


port 3000 in code
```
oc new-project hello-node

# not using nodejs~https://github.com/cg2p/hello-node.git
# detects EXPOSE in Dockerfile and sets Target Port in Route (which is the port the app in container is lisenting on)
oc new-app https://github.com/cg2p/hello-node.git

# creates the following:
# Namespace = hello-node (Kubenetes spec)
# Deployment Config = hello-node (OpenShift spec)
# Service = hello-node (Kubernetes spec)

# --name sets the name of the Route that is created
# Route = hello-node-route (OpenShift spec)
oc expose svc/hello-node --name=hello-node-route

oc status 
# get the URL to call
```











## other cmds
oc expose service reverse-with-nextjs-material --name=reverse-app-service --port=3000 --protocol="TCP" --generator="service/v2"
oc patch service reverse-app-service --port=3000 --protocol="TCP" --generator="service/v2"
 