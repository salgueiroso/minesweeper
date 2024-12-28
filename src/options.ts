/**
 * The game options
 */
export interface Options {
    /**
     * The number of rows
     */
    rows: number;

    /**
     * The number of columns
     */
    columns: number;

    /**
     * The number of bombs
     */
    bombs?: number;

    /**
     * The bomb ratio
     */
    bombRatio?: number;

    /**
     * Show all bombs at game over
     */
    showAllBombsAtGameOver?: boolean;
}
