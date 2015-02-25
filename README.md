# API gateway
API gateway for lahirajud.com clients.

## Requirements:
1. Assuming your using Mac OS X, install [boot2docker](https://github.com/boot2docker/osx-installer/releases).
1. Install [docker](https://docs.docker.com/installation/).

## Setup:
1. Clone this repository: `git clone git@github.com:lahirajudDOTcom/lrj-api-gateway.git`.
2. Install dependencies: `npm install`
3. Build docker image: `docker build -t <your_username>/lrj-api-gateway`. See more details on [building docker images](https://docs.docker.com/userguide/dockerimages/).
4. Run docker image: `docker run -p 49160:8080 -v <clone_path>:/src/lrj-api-gateway <your_username>/lrj-api-gateway`. The `-v` option enables synching of your local files to the `/src/lrj-api-gateway` directory in your running docker image. This is useful when in development mode.
5. If you're using boot2docker for Mac OS X, run: `boot2docker ip` to get the Boot2Docker VM's IP, then visit `<boot2docker_ip>:49160` in the browser.
