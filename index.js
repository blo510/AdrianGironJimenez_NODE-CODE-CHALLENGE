const fs = require('fs');
const prompt = require('prompt-sync')();

const INPUT_MANAGER = require('./input-manager');
const MARTIAN_ROBOTS = require('./martian-robots');

const DIMENSIONS = INPUT_MANAGER.getDimensions();
var dimensionsLog = {'width' : DIMENSIONS.WIDTH, 'height' : DIMENSIONS.HEIGHT};
var robotIO = [];

/**
 * Main loop in 3 phases:
 * - Set initial coordinates and orientation
 * - Set the movement path (actions to be performed by the robot)
 * - Calculate the ouput (last position, orientation and if it's lost)
 * If there's an error in the inputs, continues to a new cycle.
 * To stop the algorithm, 'stop' must be typed instead of the new input.
 */
martianRobots : while (true){
    let coordinatesInput = prompt('Tell me the robot initial coordinates and his orientation (separated with space -> x y o): ');
    if (coordinatesInput.toLowerCase() == 'stop'){break martianRobots;}
    let coordinates = INPUT_MANAGER.getInitialCoordinates(coordinatesInput);
    if (!coordinates){continue martianRobots;}

    let movementInput = prompt('Tell me the robot movementPath (L, R, F): ');
    let movementPath = INPUT_MANAGER.getMovementPath(movementInput);
    if (!movementPath){continue martianRobots;}

    let output = MARTIAN_ROBOTS.followPath(coordinates, movementPath, DIMENSIONS);
    robotIO.push({
        input : coordinatesInput,
        output : output
    });
    console.log(output);
}

/**
 * When algorithm is stopped, it generates additional information about the execution
 * and load it in a json (log.json)
 */
try {
    let additionalInfo = MARTIAN_ROBOTS.getOuptut(); 
    let log = JSON.stringify({
        'dimensions' : dimensionsLog,
        'robotIO' : robotIO,
        'additionalInfo' : additionalInfo
    }, null, '\t');

    fs.appendFile('log.json', log, () => {
        console.log('log generated');
    });

} catch (error) {
    console.log('any robots launched');
}



