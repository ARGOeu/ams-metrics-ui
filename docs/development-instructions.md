## Development instructions for ams-metrics-ui app

* clone repo:
```
$ git clone ssh://phab-vcs-user@phab.dev.grnet.gr:222/diffusion/METRICSUI/ams-metrics-ui.git
```
* go to development branch: 
```
$ cd ams-metrics-ui
```
```
$ git checkout develop
```

* install dependencies:
```
$ npm install
```
* start chrome with disabled security: 
```
$ google-chrome --disable-web-security --user-data-dir
```
* start app:
```
$ npm start
```

##Test accounts

```
superAdmin = e2c920cd512a6aa4408f3a52013f0698ae6c6efd
```
```
publisher = 1ab5e656f48d484398a4a7de118b70a0e11226f5
```
```
projectAdmin = adf77d5a0fafccb996ac41bab657466feeda9b28
```
```
consumer = 049e2a1ad8634339ec23e094280aa78c94a2b944
```