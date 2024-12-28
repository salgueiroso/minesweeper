import { FieldState, FieldType, Position } from ".";

/**
 * The game field. It can be a bomb or not.
 */
export class Field implements Position {

    /**
     * The field row
     */
    row: number;

    /**
     * The field column
     */
    column: number;

    /**
     * Create a new field.
     * @param position set position of the field. It is a row and a column
     * @param type set the type of the field. It can be a bomb, a number, none or ...
     * @param state set the state of the field. It can be open, closed, flagged or questioned
     * @param number set the number of the field. t is the number of bombs around the field
     */
    constructor(private position: Position, public type: FieldType, public state: FieldState, private fieldNumber: number = 0) {
        this.row = position.row;
        this.column = position.column;
    }

    /** 
     * The field number. It is the number of bombs around the field
     */
    public get number(): number { return this.fieldNumber; }

    /**
     * Set the field number. It is the number of bombs around the field.
     * It is limited to max 8 and min 0
     */
    public set number(value: number) { this.fieldNumber = Math.min(8, Math.max(0, value)); }

    /**
     * Open the field
     */
    public open(): void {
        if (this.state == FieldState.Closed) {
            this.state = FieldState.Open;

            if (this.type == FieldType.Bomb) {
                // console.log('Game Over!');
            }
        } else {
            // console.log('Field is already open');
            throw new Error("Field is not closed");

        }
    }

    /**
     * Flag the field
     */
    public flag(): void {
        if (this.state == FieldState.Closed) {
            this.state = FieldState.Flagged;
        } else if (this.state == FieldState.Flagged) {
            throw new Error("Field is already flagged");
        } else {
            throw new Error("Field is not closed");
        }
    }

    /**
     * Unflag the field
     * @throws Error if the field is not flagged
     */
    public unflag(): void {
        if (this.state == FieldState.Flagged) {
            this.state = FieldState.Closed;
        } else {
            throw new Error("Field is not flagged");
        }
    }

    /**
     * Question the field
     * @throws Error if the field is not closed
     */
    public question(): void {
        if (this.state == FieldState.Closed) {
            this.state = FieldState.Question;
        } else if (this.state == FieldState.Question) {
            throw new Error("Field is already questioned");
        } else {
            throw new Error("Field is not closed");
        }
    }

    /**
     * Unquestion the field
     */
    public unquestion(): void {
        if (this.state == FieldState.Question) {
            this.state = FieldState.Closed;
        } else {
            throw new Error("Field is not questioned");
        }
    }
}

/**
 * The game board fields type
 */
export type Fields = Field[];
