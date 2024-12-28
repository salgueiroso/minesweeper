import { FieldType, Game } from '../src';

describe('Game', () => {
    test('should create a new game', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        expect(game).toBeInstanceOf(Game);
    });

    test('should create a new game with a gameBoard', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        game.recreateGameBoard();
        expect(game.gameBoard).toHaveLength(100);
    });

    test('should return the position from an index', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        expect(game.getPositionFromIndex(0)).toEqual({ row: 0, column: 0 });
        expect(game.getPositionFromIndex(9)).toEqual({ row: 0, column: 9 });
        expect(game.getPositionFromIndex(10)).toEqual({ row: 1, column: 0 });
        expect(game.getPositionFromIndex(99)).toEqual({ row: 9, column: 9 });
    });

    test('should return the index from a position', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        expect(game.getIndexFromPosition({ row: 0, column: 0 })).toBe(0);
        expect(game.getIndexFromPosition({ row: 0, column: 9 })).toBe(9);
        expect(game.getIndexFromPosition({ row: 1, column: 0 })).toBe(10);
        expect(game.getIndexFromPosition({ row: 9, column: 9 })).toBe(99);
    });

    test('should fill the game board with bombs', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        game.recreateGameBoard();
        game.fillBombs(0);
        expect(game.gameBoard.filter(field => field.type === FieldType.Bomb)).toHaveLength(10);
    });

    test('should normalize the bomb ratio', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.5 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(50);
    });

    test('should normalize the bomb ratio to 10%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.1 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(10);
    });

    test('should normalize the bomb ratio to 99%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.99 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(98);
    });

    test('should normalize the bomb ratio to 10% when it is undefined', () => {
        const game = new Game({ rows: 10, columns: 10 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(10);
    });

    test('should normalize the bomb ratio to 10% when it is 0', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(10);
    });

    test('should normalize the bomb ratio to 98% when it is 1', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 1 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(98);
    });

    test('should normalize the bomb ratio to 50% when it is 0.5', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.5 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(50);
    });

    test('should normalize the bomb ratio to 51% when it is 0.51', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.51 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(51);
    });

    test('should normalize the bomb ratio to 1% when it is 0.01', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.01 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(1);
    });

    test('should normalize the bomb ratio to 2% when it is 0.02', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.02 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(2);
    });

    test('should normalize the bomb ratio to 98% when it is 0.98', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.98 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(98);
    });

    test('should normalize the bomb ratio to 97% when it is 0.97', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.97 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(97);
    });

    test('should normalize the bomb ratio to 98% when it is 99%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.99 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(98);
    });

    test('should normalize the bomb ratio to 1% when it is 1%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.01 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(1);
    });

    test('should normalize the bomb ratio to 10% when it is 10%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.1 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(10);
    });

    test('should normalize the bomb ratio to 50% when it is 50%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.5 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(50);
    });


    test('should normalize the bomb ratio to 98% when it is 98%', () => {
        const game = new Game({ rows: 10, columns: 10, bombRatio: 0.98 });
        game.normalizeBombsOptions();
        expect(game.options.bombs).toBe(98);
    });

    test('should fill the bombs with initialField as index 0 ', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        game.fillBombs(17);
        expect(game.gameBoard[17].type).not.toBe(FieldType.Bomb);
    });

    test('should fill the bombs with initialField as index 99 ', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        game.fillBombs(99);
        expect(game.gameBoard[99].type).not.toBe(FieldType.Bomb);
    });

    test('should fill the bombs with initialField as Position ', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        game.fillBombs({ row: 0, column: 0 });
        expect(game.gameBoard[0].type).not.toBe(FieldType.Bomb);
    });

    test('should fill the bombs with initialField as Field', () => {
        const game = new Game({ rows: 10, columns: 10, bombs: 10 });
        game.fillBombs(game.gameBoard[17]);
        expect(game.gameBoard[17].type).not.toBe(FieldType.Bomb);
    });


});
