# Buildy UI
[![Build Status](https://travis-ci.org/buildlyio/buildly-ui-react.svg?branch=master)](https://travis-ci.org/buildlyio/buildly-ui-react) [![Documentation Status](https://readthedocs.org/projects/buildly-ui/badge/?version=latest)](https://buildly-ui.readthedocs.io/en/latest/?badge=latest) [![Gitter](https://badges.gitter.im/Buildlyio/community.svg)](https://gitter.im/Buildlyio/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Buildy UI is a [React](https://reactjs.org/) web application that implements the core features of the UI core and the Buildly Core Administrator (https://github.com/buildlyio/buildly-core).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The web application was tested and built with the following versions: 

- node v10.16.0
- yarn v1.17.3
- gulp-cli v2.2.0

### Installing

First of all, you need to have a Buildly Core instance up and running locally.
Further detail about how to deploy Buildly Core locally, check its [documentation](https://buildly-core.readthedocs.io/en/latest/).

To install the application you need to download and install its dependencies, so you have to navigate to the project folder and run the following command:

```
$ yarn install
```

Now, initialize and build the project

```
$ yarn run init
$ yarn run build
```

To run the web app:

```
$ yarn run start
```

your Buildy UI will be running locally and listening to the port 3000, so you can access it via your browser typing this address: 127.0.0.1:3000

## Running the tests

To **run tests** using [Jest](https://jestjs.io/): 

```
$ yarn run test
```

## Deployment

To deploy Buildly UI on live, you can either use our [Buildly UI Docker image](https://hub.docker.com/r/buildly/buildly-ui) from Docker Hub or build your own image and host it somewhere, so it can be used with your deployment platform and/or tool.


### Build Docker image

First you need to have the web app dependencies installed and the app initialized locally.
And then you need to build it as a production application executing the following command:

```
$ yarn run build-prod
```

Now, you just need to build a Docker image and host it somewhere. Further info about how to build images, check Docker's [documentation](https://docs.docker.com/).

### Configuration

The following table lists the configurable parameters of Buildly UI and their default values.

|             Parameter               |            Description             |                    Default                |
|-------------------------------------|------------------------------------|-------------------------------------------|
| `API_URL`                           | Buildly Core URL                   | ``      |
| `OAUTH_CLIENT_ID`                   | The client identifier issued to the client during Buildly Core deployment  | `` |
| `OAUTH_TOKEN_URL`                   | Buildly Core URL used to authenticate users | `` |

Specify each parameter using `-e`, `--env`, and `--env-file` flags to set simple (non-array) environment variables to `docker run`. For example,

```bash
$ docker run -e MYVAR1 --env MYVAR2=foo \
    --env-file ./env.list \
    buildly-ui
```

## Built With

* [Travis CI](https://travis-ci.org/) - Recommended CI/CD

## Contributing

Please read [CONTRIBUTING.md](https://github.com/buildlyio/docs/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/buildlyio/buildly-ui-react/tags). 

## Authors

* **Buildly** - *Initial work*

See also the list of [contributors](https://github.com/buildlyio/buildly-ui-react/graphs/contributors) who participated in this project.

## License

This project is licensed under the GPL v3 License - see the [LICENSE](LICENSE) file for details
