# Options for OpenShift deployments
Pull the `hello-node` from GitHub and build. The build detects port 3000 from the Dockerfile. 

There is no `.env` file as used for local development. The server returns "Hello World!" plus an echo of the environment variable MYVAR which if not present gets set to 'default'.


## Basic `oc new-app` deployment
No environment variable can be set in this deployment.

```
oc new-project hello-node
oc new-app https://github.com/cg2p/hello-node.git
oc expose svc/hello-node --name=hello-node-route
```

Browse server at the Route URL
> Web page displays MYVISIBLEVAR=default, MYSECRETVAR=unset


## Set environment variable in build creation
The build creation process creates a DeploymentConfig object (OpenShift spec) and sets the environment variable of MYVAR=NoSecret

```
oc new-project hello-node
oc new-app https://github.com/cg2p/hello-node.git -e MYVISIBLEVAR=var-set-from-oc-new-app-call
oc expose svc/hello-node --name=hello-node-route
```

Browse server at the Route URL
> Web page displays MYVAR=nosecret

## Set environment variable through a Secret post-build
After build create a Kubernetes secret to hold the environment variable of MYSECRETVAR=BigSecret

```
oc new-project hello-node
oc new-app https://github.com/cg2p/hello-node.git
oc create secret generic hello-node-secret --from-literal=MYSECRETVAR=BigSecret
oc set env --from=secret/hello-node-secret dc/hello-node
oc expose svc/hello-node --name=hello-node-route
```

Browse server at the Route URL
> Web page displays MYVAR=BigSecret
