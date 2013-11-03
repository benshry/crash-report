#!/bin/bash

# remove all css files and recompile
rm -rf ../html/css/index.css

# make sass listen for changes to scss files
sass --watch ../html/css/:../html/css/
