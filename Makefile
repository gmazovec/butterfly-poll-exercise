
all: build

build:
	./node_modules/.bin/node-sass public/assets/css/style.scss > public/assets/css/style.css
