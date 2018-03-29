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
