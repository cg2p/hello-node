# Development of Operator for `hello-node` in Go
Using this [tutorial](https://sdk.operatorframework.io/docs/building-operators/golang/tutorial/)

Install with `brew install operator-sdk`

## Operator from an Image
Build the operator image and push to repo 
```
operator-sdk init --domain acme.com --repo github.com/cg2p/hello-node-operator
operator-sdk create api --group hello --version v1alpha1 --kind HelloWorld --resource --controller
make docker-build docker-push IMG="acme.com/hello-node-operator:v0.0.1"


```

Install Operator Lifecycle Management
```
operator-sdk olm install
make bundle IMG="acme.com/hello-node-operator:v0.0.1"
make bundle-build bundle-push
operator-sdk run bundle acme.com/hello-node-operator-bundle:v0.0.1
```

Create a HelloWorld CRD
```

```

## kubebuilder
Install
```
curl -L -o kubebuilder https://go.kubebuilder.io/dl/latest/darwin/amd64
chmod +x kubebuilder && mv kubebuilder /usr/local/bin/
```

Build api
```
kubebuilder init --domain acme.com --repo acme.com/hello-node-operator
kubebuilder create api --group hello --version v1alpha1 --kind HelloWorld --resource --controller
```

Install it
```
kubectl cluster-info
make install
make run
```



