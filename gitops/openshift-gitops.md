
oc project openshift-gitops
oc extract secret/argocd-cluster-cluster -n openshift-gitops --to=-

git clone https://github.com/siamaksade/openshift-gitops-getting-started
cd openshift-gitops-getting-started

oc create -f argo/cluster.yaml
oc get application -n openshift-gitops

