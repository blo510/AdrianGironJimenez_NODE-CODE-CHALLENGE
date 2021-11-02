const { test, expect } = require('@jest/globals');
const INPUT_MANAGER = require('../input-manager');
const MARTIAN_ROBOTS = require('../martian-robots');

describe('Robot lost', () => {
    let dimensions = {WIDTH: 2, HEIGHT: 2};

    test('in southern border', () => {
        let coordinates = {x: 1, y: 1, o: 270};
        let path = 'FF';
        
        const result = MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
    
        expect(result).toBe(`1 0 S LOST`);
    });

    test('in northern border', () => {
        let coordinates = {x: 1, y: 1, o: 90};
        let path = 'FF';
        
        const result = MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
    
        expect(result).toBe(`1 ${dimensions.HEIGHT} N LOST`);
    });

    test('in western border', () => {
        let coordinates = {x: 1, y: 1, o: 180};
        let path = 'FF';
        
        const result = MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
    
        expect(result).toBe(`0 1 W LOST`);
    });

    test('in eastern border', () => {
        let coordinates = {x: 1, y: 1, o: 0};
        let path = 'FF';
        
        const result = MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
    
        expect(result).toBe(`${dimensions.WIDTH} 1 E LOST`);
    });
});

describe('Scent left', () => {
    let dimensions = {WIDTH: 1, HEIGHT: 1};
    let phases = 2;

    test('right action on scent', () => {
        let coordinates = {x: 0, y: 0, o: 90};
        let coordinatesScent = {x: 0, y: 1, o: 90};
        let path = 'FF';
        
        MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
        const result = MARTIAN_ROBOTS.followPath(coordinatesScent, 'R', dimensions);
    
        expect(result).toBe(`0 1 E`);
    });

    test('left action on scent', () => {
        let coordinates = {x: 0, y: 0, o: 90};
        let coordinatesScent = {x: 0, y: 1, o: 90};
        let path = 'FF';
        
        MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
        const result = MARTIAN_ROBOTS.followPath(coordinatesScent, 'L', dimensions);
    
        expect(result).toBe(`0 1 W`);
    });

    test('forward action on scent', () => {
        let coordinates = {x: 0, y: 0, o: 90};
        let coordinatesScent = {x: 0, y: 1, o: 90};
        let path = 'FF';
        
        MARTIAN_ROBOTS.followPath(coordinates, path, dimensions);
        const result = MARTIAN_ROBOTS.followPath(coordinatesScent, 'F', dimensions);
    
        expect(result).toBe(`0 1 N`);
    });

    test('many scents to move off', () => {
        let coordinatesW = {x: 0, y: 0, o: 180};
        let coordinatesN = {x: 0, y: 1, o: 90};
        let coordinatesE = {x: 1, y: 1, o: 0};
        let coordinatesS = {x: 1, y: 0, o: 270};
        let path = 'F';
        
        MARTIAN_ROBOTS.followPath(coordinatesW, path, dimensions);
        MARTIAN_ROBOTS.followPath(coordinatesN, path, dimensions);
        MARTIAN_ROBOTS.followPath(coordinatesE, path, dimensions);
        MARTIAN_ROBOTS.followPath(coordinatesS, path, dimensions);
        const result = MARTIAN_ROBOTS.followPath(coordinatesW, 'FFFFFFFRFFFFFFFFRFFFFFFFRFFFFFFRFFFFFF', dimensions);
    
        expect(result).toBe(`0 0 W`);
    });
});




