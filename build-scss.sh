#!/bin/bash

while true; do
    sassc scss/screen.scss public/screen.css
    echo "Built your scss shit"

    inotifywait --includei '\.scss$' scss &>/dev/null
    sleep 0.2
done
