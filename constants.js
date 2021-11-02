/**
 * This module only contains constants to be used in the algorithm
 */
const CARDINAL_POINTS = ['N', 'S', 'E', 'W'];
const INSTRUCTIONS = ['L', 'R', 'F'];
const DEGREES = {
    'N' : 90,
    'E' : 0,
    'S' : 270,
    'W'  : 180
}
const ORIENTATION = {
    90 : 'N',
    0 : 'E',
    270 : 'S',
    180 : 'W'
};

const CONSTANTS = {}

CONSTANTS.CARDINAL_POINTS = CARDINAL_POINTS;
CONSTANTS.INSTRUCTIONS = INSTRUCTIONS;
CONSTANTS.ORIENTATION = ORIENTATION;
CONSTANTS.DEGREES = DEGREES

module.exports = CONSTANTS;