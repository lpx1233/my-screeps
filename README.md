# My Screeps Project
Project for my screeps game with typescript

## Usage
### Using docker and make
make:
```bash
# build the code along with nodejs docker image
make build
# build the code & push to main branch
make push-main
# build the code & push to sim branch
make push-sim
```

docker only:
```bash
# build the image
docker build -t [tag] .
# build the code & push to main branch
docker run -it --rm [tag]
# build the code & push to sim branch
docker run -it --rm [tag] -c --environment DEST:sim
```

### Using rollup locally (w/o docker)
```bash
# compile code
rollup -c
# build the code & push to main branch
rollup -c --environment DEST:main
# build the code & push to sim branch
rollup -c --environment DEST:sim
# build(watch) the code & push to sim branch
rollup -cw --environment DEST:[dst]
```
