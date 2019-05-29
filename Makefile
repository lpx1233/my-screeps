.PHONY : build push-main push-sim

build:
	docker build -t my-screeps .

push-main: build
	docker run -it --rm my-screeps

push-sim: build
	docker run -it --rm my-screeps -c --environment DEST:sim
