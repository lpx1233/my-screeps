FROM node:11

# install roll up
RUN npm i -g rollup

# install other deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /my-screeps && cp -a /tmp/node_modules /my-screeps/

# copy project file
COPY . /my-screeps
WORKDIR /my-screeps

ENTRYPOINT ["rollup"]
CMD ["-c", "--environment", "DEST:main"]
