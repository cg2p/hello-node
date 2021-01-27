# Hello Node.
This is the simplest of NodeJS app to say "Hello World !".

In order to be portable to its environment the server does not bind to a particular host, but simply listens on port 3000.

## Local Development
Clone the repository. Test the web server by running from the command line
```
cd <your hello-node directory>
npm install
npm run start
```
Test running at `http://localhost:3000`


## Docker
Build and run the same app as a Docker container
```
cd <your hello-node directory>
docker build -t hello-node:1.0 .
```
Now prove that we are not running the local development command line version, where the app listens on port 3000. We execute the container, which exposes port 3000 of the app app running inside the container, and exposes it to the local mahine on port 3001
```
docker run -p 3001:3000 --detach --name hello-node hello-node:1.0
```
Test running at `http://localhost:3001`


## OpenShift Deployment
In the [OpenShift document](openshift/OPENSHIFT.md) there are instructions for:
- deployment of the app to OpenShift cluster using `oc new-app`

