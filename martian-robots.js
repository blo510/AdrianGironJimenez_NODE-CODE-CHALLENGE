const CONSTANTS = require('./constants');

var dimensions = {};
var scentsCoordinates = [];

var exploredSurfaceMap = null;
var actionsPerformed = 0; //ignore times not counted
var ignoreToMoveOff = 0;
var launchedRobots = 0;
var lostRobots = 0;

/**
 * This function generate an object with additional output information
 * @returns output - object (json) with additional information of the whole execution
 */
function getOuptut(){
    let totalSurface = (dimensions.WIDTH + 1) * (dimensions.HEIGHT + 1);
    let notExploredSurface = 0;

    for (let i = 0; i < exploredSurfaceMap.length; i++){
        notExploredSurface += exploredSurfaceMap[i].filter(i => i == 0).length;
    }

    let exploredSurface = totalSurface - notExploredSurface;

    let output = {
        'totalSurface' : totalSurface,
        'notExploredSurface' : notExploredSurface,
        'exploredSurface' : exploredSurface,
        'exploredSurfaceMap' : exploredSurfaceMap,
        'actionsPerformed' : actionsPerformed,
        'ignoreToMoveOff' : ignoreToMoveOff,
        'launchedRobots' : launchedRobots,
        'lostRobots' : lostRobots,
        'scentsCoordinates' : scentsCoordinates
    }

    return output;
}

/**
 * This function generates a 2D array filled with 0s (not explored)
 * @param {WIDTH, HEIGHT} dimensions - surface x, y dimensions
 */
function createSurface(dimensions){
    if(!exploredSurfaceMap){
        exploredSurfaceMap = new Array(dimensions.WIDTH + 1);
        for(let i = 0; i<exploredSurfaceMap.length; i++) {
            exploredSurfaceMap[i] = new Array(dimensions.HEIGHT + 1);
            exploredSurfaceMap[i].fill(0);
        }
    }
}

/**
 * Check if the new coordinates aren't explored yet and if not, then save it in the map
 * with the robotID. RobotID(launchedRobots is) just represented by the display order
 * @param {x, y, o} coordinates - new surface (coordinates) to be explored
 */
function exploreNewSurface(coordinates){
    let newX = coordinates.x;
    let newY = coordinates.y;

    if (newX > -1 && newY > -1 && newX <= dimensions.WIDTH && newY <= dimensions.HEIGHT && exploredSurfaceMap[newX][newY] == 0){
        exploredSurfaceMap[newX][newY] = launchedRobots; //robotID
    }
}

/**
 * This function calculates the next coordinates depending of the movement
 * @param movement - R (turns -90º), L (turns +90º), F (move forward)
 * @param {x, y, o} coordinates - actual coordinates
 * @returns newCoordinates - coordinates after the movement
 */
function moveRobot(movement, coordinates){
    actionsPerformed ++;
    let newCoordinates = JSON.parse(JSON.stringify(coordinates)); //deepcopy method to clone objects

    let radians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    switch(movement){
        case 'L':
            newCoordinates.o = (newCoordinates.o + 90) % 360;
            break;
        case 'R':
            newCoordinates.o = (newCoordinates.o == 0) ? 270 : (newCoordinates.o - 90);
            break;
        case 'F':
            newCoordinates.x += Math.round(Math.cos(radians(newCoordinates.o)));
            newCoordinates.y += Math.round(Math.sin(radians(newCoordinates.o)));
            if (robotInAScent(coordinates) && robotLost(newCoordinates)){
                actionsPerformed --;
                ignoreToMoveOff ++;
                return coordinates; //idle
            }else if(!robotLost(newCoordinates)){
                exploreNewSurface(newCoordinates);
            }
            break;
    }
    return newCoordinates;
}

/**
 * This function checks if there's a scent in the args coordinates
 * @param {x, y, o} coordinates - coordinates of the supposed scent
 * @returns true if there's a scent, false if not
 */
function robotInAScent(coordinates){
    if (scentsCoordinates.includes(`${coordinates.x}${coordinates.y}`)){
        return true;
    }else{
        return false;
    }
}

/**
 * This function checks if a robot is lost
 * @param {x, y, o} coordinates - coordinates in which a robot is lost
 * @returns true if robot is lost, false if not
 */
function robotLost(coordinates){
    if (coordinates.x > -1 && coordinates.y > -1 &&
        coordinates.x <= dimensions.WIDTH && coordinates.y <= dimensions.HEIGHT){
        return false;
    }else{
        return true;
    }
}

/**
 * This function executes the full movement path according to the initial coordinates
 * @param {x, y, o} coordinates - initial coordinates
 * @param  movementPath - sequence of movement to be performed by the robot
 * @param {WIDTH, HEIGHT} newDimensions - dimensions of the surface
 * @returns 
 */
function followPath(coordinates, movementPath, newDimensions){
    launchedRobots ++;
    dimensions = newDimensions;
    createSurface(dimensions);
    exploreNewSurface(coordinates);

    for (let i = 0; i < movementPath.length; i++){
        let movement = movementPath.charAt(i);
        let newCoordinates = moveRobot(movement, coordinates);
        if (robotLost(newCoordinates)){
            scentsCoordinates.push(`${coordinates.x}${coordinates.y}`);
            lostRobots ++;
            return `${coordinates.x} ${coordinates.y} ${CONSTANTS.ORIENTATION[coordinates.o]} LOST`;
        }else{
            coordinates = newCoordinates;
        }
    }
    
    return `${coordinates.x} ${coordinates.y} ${CONSTANTS.ORIENTATION[coordinates.o]}`;
}


const MARTIAN_ROBOTS = {}

MARTIAN_ROBOTS.followPath = followPath;
MARTIAN_ROBOTS.getOuptut = getOuptut;

module.exports = MARTIAN_ROBOTS;