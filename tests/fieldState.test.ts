import { FieldState } from "../src";

describe('FieldState', () => {
    test('Should be able to set field state', () => {
        const fieldState = FieldState.Closed;
        expect(fieldState).toBe(FieldState.Closed);
    });
});