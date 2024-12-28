import { Options, Fields, Field, FieldType, FieldState, Position } from ".";

/**
 * The game board
 */
export class Game {

    private _gameBoard?: Fields;

    /**
     * Create a new game board
     * @param _options The game options
     */
    constructor(private _options: Options) {
        this.normalizeBombsOptions();
    }

    /**
     * The game options
     */
    public get options(): Options { return this._options };

    /**
     * Normalize the bombs options
     */
    public normalizeBombsOptions(): void {
        // define the bomb ratio to undefined if it is false, null or undefined
        this._options.bombRatio ||= undefined;

        // define the bombs to 10% of the game board if it is false, null or undefined
        this._options.bombRatio ??= 0.1;

        // define the bomb ratio to 98% if it is greater than 98%
        this._options.bombRatio = Math.min(this._options.bombRatio, 0.98);

        // define the bomb ratio to 1% if it is less than 1%
        this._options.bombRatio = Math.max(this._options.bombRatio, 0.01);

        // define the board length
        const boardLength = this._options.rows * this._options.columns;

        // define the bombs count with ratio if it is not defined. 
        this._options.bombs ??= Math.floor(boardLength * this._options.bombRatio);

        // define de bombs count to the maximum of the game board length - 2
        this._options.bombs = Math.min(this._options.bombs, boardLength - 2);

        // adjuste the bomb ratio to the bombs count
        this._options.bombRatio = this._options.bombs / boardLength;
    }

    /**
     * The game board is a array of fields
     * @returns the game board array
     */
    public get gameBoard(): Fields { return this._gameBoard ??= this.recreateGameBoard(); }

    /**
     * Recreate the game board
     * @returns the game board array
     */
    public recreateGameBoard(): Fields {
        this.normalizeBombsOptions();
        return this._gameBoard = new Array(this._options.rows * this._options.columns)
            .fill(null)
            .map((_, idx) => new Field(this.getPositionFromIndex(idx), FieldType.None, FieldState.Closed));
    }

    /**
     * Fill the game board with bombs
     * @param initialField The initial field to avoid the first bomb. 
     */
    public fillBombs(initialField: Field | Position | number): void {

        let initialFieldIndex: number = -1;

        if (typeof initialField === 'number') {
            initialFieldIndex = +initialField;
            initialField = this.gameBoard[initialFieldIndex];
        } else {
            initialFieldIndex = this.getIndexFromPosition(initialField);
            initialField = this.gameBoard[initialFieldIndex];
        }

        let bombs = this._options.bombs ?? 0;


        while (bombs > 0) {
            const index = Math.floor(Math.random() * this.gameBoard.length);
            if (initialFieldIndex === index) {
                continue;
            }

            const field = this.gameBoard[index];

            if (field.type !== FieldType.Bomb) {
                field.type = FieldType.Bomb;
                bombs--;
            }
        }

    }

    /**
     * Get the neighbours of a field
     * @param field The field to get the neighbours. It can be a field, a position or an index
     * @returns The neighbours of the field
     */
    public getNeighbours(field: Field | Position | number): Fields {

        let fieldIndex: number = -1;
        let foundField: Field | null = null;
        if (typeof field === 'number') {
            fieldIndex = +field;
            foundField = this.getFieldFromIndex(fieldIndex);
        } else {
            fieldIndex = this.getIndexFromPosition(field);
            foundField = this.gameBoard[fieldIndex];
        }

        if (!foundField)
            return [];

        const neighbours: (Field | null)[] = [
            this.getFieldFromPosition({ row: foundField.row - 1, column: foundField.column - 1 }),
            this.getFieldFromPosition({ row: foundField.row - 1, column: foundField.column }),
            this.getFieldFromPosition({ row: foundField.row - 1, column: foundField.column + 1 }),
            this.getFieldFromPosition({ row: foundField.row, column: foundField.column - 1 }),
            this.getFieldFromPosition({ row: foundField.row, column: foundField.column + 1 }),
            this.getFieldFromPosition({ row: foundField.row + 1, column: foundField.column - 1 }),
            this.getFieldFromPosition({ row: foundField.row + 1, column: foundField.column }),
            this.getFieldFromPosition({ row: foundField.row + 1, column: foundField.column + 1 }),
        ];

        const validNeighbours = neighbours.filter(field => field !== null) as Fields;

        return validNeighbours;

    }

    /**
     * Get the neighbours bombs of a field
     * @param field The field to get the neighbours. It can be a field, a position or an index
     * @returns The neighbours bombs of the field
     */
    public getNeighboursBombs(field: Field | Position | number): Fields {
        return this.getNeighbours(field).filter(field => field.type === FieldType.Bomb);
    }

    /**
     * Fill the numbers on the fields of the game board
     */
    public fillNumbers(): void {
        this.gameBoard.forEach(field => {
            if (field.type !== FieldType.Bomb) {
                const neighboursBombs = this.getNeighboursBombs(field);
                if (neighboursBombs.length > 0) {
                    field.number = neighboursBombs.length;
                    field.type = FieldType.Number;
                }
            }
        });
    }

    /**
     * Get the position from an index
     * @param index The index
     * @returns The position
     */
    public getPositionFromIndex(index: number): Position {
        return {
            row: Math.floor(index / this._options.columns),
            column: index % this._options.columns
        }
    }

    /**
     * Get the index from a position
     * @param position The position
     * @returns The index
     */
    public getIndexFromPosition(position: Position): number {
        return position.row * this._options.columns + position.column;
    }

    /**
     * Get the field from a position. It can be null if the position is out of the game board.
     * @param position The position to get the field
     * @returns The field or null
     */
    public getFieldFromPosition(position: Position): Field | null {

        const index = this.getIndexFromPosition(position);

        return this.getFieldFromIndex(index);
    }

    /**
     * Get the field from a index. It can be null if the index is out of the game board.
     * @param index The index to get the field
     * @returns The field or null
     */
    public getFieldFromIndex(index: number): Field | null {
        if (this.gameBoard.length <= 0)
            return null;

        if (index < 0 || index >= this.gameBoard.length)
            return null;

        return this.gameBoard[index];
    }
}
