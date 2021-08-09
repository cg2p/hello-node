
# OpenShift GitOps

## Install and Setup
oc extract secret/argocd-cluster-cluster -n openshift-gitops --to=-

oc project openshift-gitops
git clone https://github.com/siamaksade/openshift-gitops-getting-started
cd openshift-gitops-getting-started

oc create -f argo/cluster.yaml
oc get application -n openshift-gitops


## Create an application from Git
In advance
- image built and in a repo (need URL)
- git source needs a directory where it find deployment and service (minimum) e.g. gitops
- create deployment and service yaml
- source dir has Dockerfile (maybe n/a since going to repo)
```
app name = hello-node
project (argo) = hello-project
sync = auto (with prune and self heal if needed)
sync options
-use a schema to validate resource manifests
-Auto-create namespace

source = git repo
revision = main
path = gitops

cluster url = https://kubernetes.default.svc
namespace = hello

external vars e.g. MYVISIBLEVAR
```