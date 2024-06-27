#!/bin/bash

case "$1" in
  start)
    screen -S polarizer -dm /usr/bin/node . deploy=yes
    echo "Service started."
    ;;
  status)
    result=$(screen -list | grep polarizer)
    if [ $? == 0 ]; then
      echo "Polarizer Discord bot service is ON."
    else
      echo "Polarizer Discord bot service is OFF."
    fi
    ;;
  stop)
    screen -S polarizer -X quit
    echo "Service stopped."
    ;;
  *)
    echo "Unknown command: $1"
    exit 1
  ;;
esac
