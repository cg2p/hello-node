# Develop an OpenShift template

https://github.com/sclorg/nodejs-ex/blob/master/openshift/templates/nodejs.json

oc new-app -f ./hello-node-template.json \
    -p NAME=hello2 -p MYVAR=amazing -p SERVER_PORT=3002

oc new-app ruby-helloworld-sample \
    -p ADMIN_USERNAME=admin,ADMIN_PASSWORD=mypassword


oc get --export bc,is,dc,route,svc,sc -l app=hello-node --as-template='my-node-template'
oc get dc -o json > hello-dc.json


## Reference
http://v1.uncontained.io/playbooks/fundamentals/template_development_guide.html 
