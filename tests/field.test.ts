import { Field, FieldState, FieldType } from '../src';

describe('Field', () => {
    test('should create a new field', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Closed);
        expect(field).toBeInstanceOf(Field);
    });

    test('should open the field if closed', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Closed);
        field.open();
        expect(field.state).toBe(FieldState.Open);
    });

    test('should not open the field if opened', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Open);

        expect(() => field.open()).toThrow("Field is not closed");
    });

    test('should not open the field if flagged', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Flagged);

        expect(() => field.open()).toThrow("Field is not closed");
    });

    test('should flag the field if closed', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Closed);
        field.flag();
        expect(field.state).toBe(FieldState.Flagged);
    });

    test('should not flag the field if opened', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Open);

        expect(() => field.flag()).toThrow("Field is not closed");
    });

    test('should unflag the field if flagged', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Flagged);
        field.unflag();
        expect(field.state).toBe(FieldState.Closed);
    });

    test('should not unflag the field if opened', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Open);

        expect(() => field.unflag()).toThrow("Field is not flagged");
    });

    test('should not unflag the field if closed', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Closed);

        expect(() => field.unflag()).toThrow("Field is not flagged");
    });

    test('should unflag the field if flagged with a bomb', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Flagged);
        field.unflag();
        expect(field.state).toBe(FieldState.Closed);
    });

    test('should not unflag the field if flagged with a bomb and opened', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Open);
        expect(() => field.unflag()).toThrow("Field is not flagged");
    });

    test('should not unflag the field if flagged with a bomb and closed', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Closed);
        expect(() => field.unflag()).toThrow("Field is not flagged");
    });

    test('should unflag the field if flagged with a bomb and flagged', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Flagged);
        field.unflag();
        expect(field.state).toBe(FieldState.Closed);
    });

    test('should not open the field if flagged with a bomb', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Flagged);
        expect(() => field.open()).toThrow("Field is not closed");
    });

    test('should not open the field if flagged with a bomb and opened', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Open);
        expect(() => field.open()).toThrow("Field is not closed");
    });

    test('should open the field if it is not a bomb and closed', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Closed);
        field.open();
        expect(field.state).toBe(FieldState.Open);
    });

    test('should number field 0', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Closed, 0);
        expect(field.number).toBe(0);
    });

    test('should number field 1', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Closed, 1);
        expect(field.number).toBe(1);
    });

    test('should number field 2 after set to 2', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Closed, 0);
        expect(field.number).toBe(0);
        field.number = 2;
        expect(field.number).toBe(2);
    });

    test('should error if reflag after field state is flagged', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Flagged);
        expect(() => field.flag()).toThrow("Field is already flagged");
    });

    test('should question the field if closed', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Closed);
        field.question();
        expect(field.state).toBe(FieldState.Question);
    });

    test('should error if requestion after field state is question', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Question);
        expect(() => field.question()).toThrow("Field is already questioned");
    });

    test('should not question the field if opened', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Open);
        expect(() => field.question()).toThrow("Field is not closed");
    });

    test('should not unquestion the field if openned', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Open);
        expect(() => field.unquestion()).toThrow("Field is not questioned");
    });

    test('should unquestion the field if questioned', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.None, FieldState.Question);
        field.unquestion();
        expect(field.state).toBe(FieldState.Closed);
    });

    test('should open the field if closed and bomb', () => {
        const field = new Field({ row: 0, column: 0 }, FieldType.Bomb, FieldState.Closed);
        field.open();
        expect(field.state).toBe(FieldState.Open);
    });

});