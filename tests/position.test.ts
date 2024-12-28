import { Position } from "../src";

describe('Position', () => {
    test('Should be able to set position', () => {
        const position = { row: 1, column: 1 } as Position;
        expect(position.row).toBe(1);
        expect(position.column).toBe(1);
    });
});
