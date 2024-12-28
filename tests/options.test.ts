import { Options } from '../src';

describe('Options', () => {
    test('Should be able to set options', () => {
        const options = { rows: 10, columns: 10, bombs: 10, bombRatio: 0.1 } as Options;
        expect(options.rows).toBe(10);
        expect(options.columns).toBe(10);
        expect(options.bombs).toBe(10);
        expect(options.bombRatio).toBe(0.1);
    });
});