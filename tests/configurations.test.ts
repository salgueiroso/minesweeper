import { Configurations } from "../src";

describe('Configurations', () => {
    test('Should be able to set configurations', () => {
        const configurations = {} as Configurations;
        expect(configurations).toBeDefined();
    });
});