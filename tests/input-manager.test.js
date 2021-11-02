const INPUT_MANAGER = require('../input-manager');

describe('Bad initial coordinates', () => {
    INPUT_MANAGER.setDimensions({WIDTH: 2, HEIGHT: 2});

    test('both negative', () => {
        const result = INPUT_MANAGER.getInitialCoordinates('-1 -1 N');
    
        expect(result).toBeNull();
    });

    test('both greater than max dimensions', () => {
        const result = INPUT_MANAGER.getInitialCoordinates('3 8 N');
    
        expect(result).toBeNull();
    });

    test('illegal input', () => {
        const result = INPUT_MANAGER.getInitialCoordinates('DCSL GuideSmiths');
    
        expect(result).toBeNull();
    });
});

describe('Bad movements path', () => {
    INPUT_MANAGER.setDimensions({WIDTH: 2, HEIGHT: 2});

    test('long path', () => {
        const result = INPUT_MANAGER.getMovementPath('RFRFRFLRFLRLFLRLFLRLFLRFLRLFRLFLRLFLRFRLFLLRLFRLFLRLFRLFRLFLRLFLRLFRLFLRLFLRLFLRRFRFRLRLFLRLFRRLRRFLLR');
    
        expect(result).toBeNull();
    });

    test('illegal path', () => {
        const result = INPUT_MANAGER.getMovementPath('RFRLFFJHRFLLRFL');
    
        expect(result).toBeNull();
    });
});