# Martian-Robots

Martian-Robots is a node app that simulates a fleet of robots following determined instructions. The algorithm calculates the
last position of any robot according to some initial coordinates and a movement path. Unlimited robots can be launched. In the
end, it generates an output with a lot of extra information and save in a JSON file.

## Installation

Node packages to install:
- npm install fs
- npm install prompt-sync

Also used Jest for unit test:
- npm install jest

## How to use

To run the app  ->  node index.js

To execute the unit tests   ->  npm run test

## Extra information

Unlimited robots can be launched but to finish the execution safely and to store the data you must 
give the input 'stop' (no case sensitive) instead the next initial coordinates, this will make the algorithm
stop and append the execution information in the log.json file.

