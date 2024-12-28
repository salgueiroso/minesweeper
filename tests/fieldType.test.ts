import { FieldType } from "../src";

describe('FieldType', () => {
    test('Should be able to set field type', () => {
        const fieldType = FieldType.Bomb;
        expect(fieldType).toBe(FieldType.Bomb);
    });
});