FROM node:11

RUN mkdir /my-screeps
COPY . /my-screeps

# install roll up
RUN npm i -g rollup

# install local deps
WORKDIR /my-screeps
RUN npm i

CMD ["/bin/bash"]
