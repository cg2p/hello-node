# Code Read Containers Cheat Sheet

## Setup and Run
Mac download is not verified, so you have to open `crc` manually and accept in macOS. Then move `crc` to in PATH.
```
crc setup
...
crc start
eval $(crc oc-env)
oc login -u developer https://api.crc.testing:6443

...
// open console in web browser
crc console
...
crc stop
```

## Registry
CRC use an in-built registry.


##