
all: build css

build:
	npm install

css:
	./node_modules/.bin/node-sass public/assets/css/style.scss > public/assets/css/style.css
