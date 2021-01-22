# Develop an OpenShift template

https://github.com/sclorg/nodejs-ex/blob/master/openshift/templates/nodejs.json

oc new-project hello2
oc new-app -f ./hello-node-template.json \
    -p NAME=hello2 -p MYVISIBLEVAR=amazing -p SERVER_PORT=3000
oc create secret generic hello2-secret --from-literal=MYSECRETVAR=MyBigSecret
oc set env --from=secret/hello2-secret dc/hello2

oc new-app ruby-helloworld-sample \
    -p ADMIN_USERNAME=admin,ADMIN_PASSWORD=mypassword


oc get --export bc,is,dc,route,svc,sc -l app=hello-node --as-template='my-node-template'
oc get bc,is,dc,route,svc,sc -o yaml > hello-dc.yaml
oc get all -o yaml > hello-node.yaml


## Reference
http://v1.uncontained.io/playbooks/fundamentals/template_development_guide.html 
