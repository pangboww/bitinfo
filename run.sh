#!/bin/bash
while [ true ]
do
    curl http://localhost:6800/schedule.json -d project=default -d spider=btcc
    curl http://localhost:6800/schedule.json -d project=default -d spider=huobi
    sleep 60
done
