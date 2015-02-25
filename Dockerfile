FROM centos:latest

# Enable EPEL for Node.js
RUN curl -sL https://rpm.nodesource.com/setup | bash -

# Install Node.js and npm
RUN yum install -y nodejs

# Bundle app source
WORKDIR /src/lrj-api-gateway

# Install app dependencies
RUN npm install -g nodemon

EXPOSE 8080
CMD ["nodemon", "."]
