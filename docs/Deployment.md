# Deploying with Docker (example)

First, check all environment variables in `.env.staging` & `.env.production`.
Add / remove accordingly.

## Locally (or CI)

1.  Build the Docker image: `docker build -t project-template . --no-cache [--build-arg environment=production]`
2.  Save the image to a zip file: `docker save --output project-template-latest.tar project-template:latest`
3.  Move the zipped image to the server: `scp project-template-latest.tar SERVER:~/project-template/`

## On server

1.  SSH to the server and go to the working directory: `ssh SERVER` and `cd project-template/`
2.  Load the image from the zip file: `[sudo] docker load --input project-template-latest.tar`
3.  [OPTIONAL] Update the image to the running service (⚠️ do this if Docker container is already running)
    * `[sudo] docker container stop project-template && [sudo] docker container rm project-template`
4.  Start the service with
    * `[sudo] docker run -d -p 80:3000 --name project-template project-template:latest`
