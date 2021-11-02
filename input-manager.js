const prompt = require('prompt-sync')();
const CONSTANTS = require('./constants');
var dimensions = {};

/**
 * This function set dimensions. It is used only for testing
 * @param {WIDTH, HEIGHT} newDimensions 
 */
function setDimensions(newDimensions){
    dimensions = newDimensions;
}

/**
 * This functions checks the dimensions input until it gets legal ones.
 * @returns dimensions
 */
function getDimensions(){
    let dimensionsX = -1;
    let dimensionsY = -1;
    while (dimensionsX == -1 && dimensionsY == -1){
        let dimensionsInput = prompt('Tell me the dimensions of 2D Mars (separated with space -> x y): ');
    
        let dimensionsX = dimensionsInput.split(' ')[0];
        let dimensionsY = dimensionsInput.split(' ')[1];
    
        if (dimensionsX > -1 && dimensionsY > -1 &&
            dimensionsX < 51 && dimensionsY < 51){
                dimensionsX = parseInt(dimensionsX);
                dimensionsY = parseInt(dimensionsY);
                dimensions = {WIDTH : dimensionsX, HEIGHT : dimensionsY};
                return dimensions;
        }else{
            console.log('Wrong dimensions, both values should stay between 0 and 50. Try again!');
        }
    }
}

/**
 * This function extract the initial coordinates from the input and check if they are legal.
 * @param coordinatesInput 
 * @returns coordinates
 */
function getInitialCoordinates(coordinatesInput){
    let coordinatesX = parseInt(coordinatesInput.split(' ')[0]);
    let coordinatesY = parseInt(coordinatesInput.split(' ')[1]);
    let orientation = coordinatesInput.split(' ')[2];

    if (coordinatesX > -1 && coordinatesY > -1 &&
        coordinatesX <= dimensions.WIDTH && coordinatesY <= dimensions.HEIGHT &&
        CONSTANTS.CARDINAL_POINTS.includes(orientation)){
        let coordinates = {
            x : coordinatesX,
            y : coordinatesY,
            o : CONSTANTS.DEGREES[orientation]
        }
        return coordinates;
    }else{
        console.log('Wrong initial coordinates, format should be: (x y o). Try again!');
        return null;
    }
}

/**
 * This function checks if the movement path is legal
 * @param movementPath 
 * @returns movementPath checked
 */
function getMovementPath(movementPath){
    if (movementPath.length > 99){
        console.log('The movement path length should be less than 100 characters. Try again!');
        return null;
    }
    for (let i = 0; i < movementPath.length; i++){
        let instruction = movementPath.charAt(i);
        if (!CONSTANTS.INSTRUCTIONS.includes(instruction)){
            console.log('Wrong movement path, it may contains only (L, R, F). Try again!');
            return null;
        }
    }
    return movementPath;
}

const INPUT_MANAGER = {}

INPUT_MANAGER.setDimensions = setDimensions; //ONLY FOR TESTING
INPUT_MANAGER.getDimensions = getDimensions;
INPUT_MANAGER.getInitialCoordinates = getInitialCoordinates;
INPUT_MANAGER.getMovementPath = getMovementPath;

module.exports = INPUT_MANAGER;