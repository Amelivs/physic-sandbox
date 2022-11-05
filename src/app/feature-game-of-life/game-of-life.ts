export class GameOfLife {

    public grid: Array<boolean[]> = [];
    private size = 150;

    constructor() {
        this.reset();

        for (var i = 0; i < this.size; i++) {
            this.grid.push(this.emptyVect(this.size));
        }

        /*
          grid[64][64] = 1;
          grid[64][65] = 1;
        grid[66][64] = 1;
          grid[66][65] = 1;
        grid[65][63] = 1;
        grid[65][66] = 1;
        grid[66][63] = 1;*/
        /*
       grid[64][64] = 1;
       grid[65][64] = 1;
       grid[65][63] = 1;
       grid[66][63] = 1;
       grid[66][62] = 1;
       grid[67][62] = 1;*/

        //this.initRPentomino();
        //this.initFly();

        this.initGosper({ x: 19, y: 10 });
        //this.initGosper({ x: 40, y: 40 });
        this.initGosperInv({ x: 100, y: 100 });
        this.initPuffer({ x: 50, y: 50 });
    }

    public initRPentomino() {
        this.setCell(60, 60, true);
        this.setCell(61, 60, true);
        this.setCell(61, 61, true);
        this.setCell(61, 59, true);
        this.setCell(62, 59, true);
    }

    public initFly() {
        this.setCell(0, 0, true);
        this.setCell(3, 0, true);
        this.setCell(4, 1, true);
        this.setCell(4, 2, true);
        this.setCell(0, 2, true);
        this.setCell(1, 3, true);
        this.setCell(2, 3, true);
        this.setCell(3, 3, true);
        this.setCell(4, 3, true);
    }

    public initGosper(origin: { x: number, y: number }) {
        this.setCell(origin.x + 0, origin.y + 5, true);
        this.setCell(origin.x + 0, origin.y + 6, true);
        this.setCell(origin.x + 1, origin.y + 5, true);
        this.setCell(origin.x + 1, origin.y + 6, true);
        this.setCell(origin.x + 10, origin.y + 5, true);
        this.setCell(origin.x + 10, origin.y + 4, true);
        this.setCell(origin.x + 10, origin.y + 6, true);
        this.setCell(origin.x + 11, origin.y + 3, true);
        this.setCell(origin.x + 11, origin.y + 7, true);
        this.setCell(origin.x + 12, origin.y + 2, true);
        this.setCell(origin.x + 13, origin.y + 2, true);
        this.setCell(origin.x + 12, origin.y + 8, true);
        this.setCell(origin.x + 13, origin.y + 8, true);
        this.setCell(origin.x + 14, origin.y + 5, true);
        this.setCell(origin.x + 15, origin.y + 3, true);
        this.setCell(origin.x + 15, origin.y + 7, true);
        this.setCell(origin.x + 16, origin.y + 4, true);
        this.setCell(origin.x + 16, origin.y + 5, true);
        this.setCell(origin.x + 16, origin.y + 6, true);
        this.setCell(origin.x + 17, origin.y + 5, true);
        this.setCell(origin.x + 20, origin.y + 4, true);
        this.setCell(origin.x + 20, origin.y + 3, true);
        this.setCell(origin.x + 20, origin.y + 2, true);
        this.setCell(origin.x + 21, origin.y + 2, true);
        this.setCell(origin.x + 21, origin.y + 3, true);
        this.setCell(origin.x + 21, origin.y + 4, true);
        this.setCell(origin.x + 22, origin.y + 1, true);
        this.setCell(origin.x + 22, origin.y + 5, true);
        this.setCell(origin.x + 24, origin.y + 1, true);
        this.setCell(origin.x + 24, origin.y + 0, true);
        this.setCell(origin.x + 24, origin.y + 5, true);
        this.setCell(origin.x + 24, origin.y + 6, true);
        this.setCell(origin.x + 34, origin.y + 2, true);
        this.setCell(origin.x + 34, origin.y + 3, true);
        this.setCell(origin.x + 35, origin.y + 3, true);
        this.setCell(origin.x + 35, origin.y + 2, true);
    }

    public initGosperInv(origin: { x: number, y: number }) {
        this.setCell(origin.x + 12, origin.y + 15, true);
        this.setCell(origin.x + 12, origin.y + 16, true);
        this.setCell(origin.x + 13, origin.y + 15, true);
        this.setCell(origin.x + 13, origin.y + 16, true);
        this.setCell(origin.x + 14, origin.y + 14, true);
        this.setCell(origin.x + 15, origin.y + 15, true);
        this.setCell(origin.x + 16, origin.y + 14, true);
        this.setCell(origin.x + 17, origin.y + 15, true);
        this.setCell(origin.x + 18, origin.y + 14, true);
        this.setCell(origin.x + 19, origin.y + 15, true);
        this.setCell(origin.x + 20, origin.y + 14, true);
        this.setCell(origin.x + 21, origin.y + 15, true);
        this.setCell(origin.x + 22, origin.y + 14, true);
        this.setCell(origin.x + 23, origin.y + 13, true);
        this.setCell(origin.x + 23, origin.y + 12, true);
        this.setCell(origin.x + 25, origin.y + 13, true);
        this.setCell(origin.x + 23, origin.y + 17, true);
        this.setCell(origin.x + 23, origin.y + 18, true);
        this.setCell(origin.x + 25, origin.y + 17, true);
        this.setCell(origin.x + 26, origin.y + 16, true);
        this.setCell(origin.x + 26, origin.y + 15, true);
        this.setCell(origin.x + 26, origin.y + 14, true);
        this.setCell(origin.x + 27, origin.y + 14, true);
        this.setCell(origin.x + 27, origin.y + 15, true);
        this.setCell(origin.x + 27, origin.y + 16, true);
        this.setCell(origin.x + 30, origin.y + 13, true);
        this.setCell(origin.x + 29, origin.y + 13, true);
        this.setCell(origin.x + 29, origin.y + 13, false);
        this.setCell(origin.x + 31, origin.y + 13, true);
        this.setCell(origin.x + 31, origin.y + 12, true);
        this.setCell(origin.x + 31, origin.y + 14, true);
        this.setCell(origin.x + 32, origin.y + 11, true);
        this.setCell(origin.x + 32, origin.y + 15, true);
        this.setCell(origin.x + 33, origin.y + 13, true);
        this.setCell(origin.x + 34, origin.y + 9, true);
        this.setCell(origin.x + 34, origin.y + 9, false);
        this.setCell(origin.x + 34, origin.y + 10, true);
        this.setCell(origin.x + 35, origin.y + 10, true);
        this.setCell(origin.x + 34, origin.y + 16, true);
        this.setCell(origin.x + 35, origin.y + 16, true);
        this.setCell(origin.x + 36, origin.y + 15, true);
        this.setCell(origin.x + 36, origin.y + 11, true);
        this.setCell(origin.x + 37, origin.y + 12, true);
        this.setCell(origin.x + 37, origin.y + 13, true);
        this.setCell(origin.x + 37, origin.y + 14, true);
        this.setCell(origin.x + 38, origin.y + 13, true);
        this.setCell(origin.x + 39, origin.y + 12, true);
        this.setCell(origin.x + 40, origin.y + 13, true);
        this.setCell(origin.x + 41, origin.y + 12, true);
        this.setCell(origin.x + 42, origin.y + 13, true);
        this.setCell(origin.x + 43, origin.y + 12, true);
        this.setCell(origin.x + 44, origin.y + 13, true);
        this.setCell(origin.x + 45, origin.y + 12, true);
        this.setCell(origin.x + 46, origin.y + 12, true);
        this.setCell(origin.x + 46, origin.y + 13, true);
        this.setCell(origin.x + 47, origin.y + 13, true);
        this.setCell(origin.x + 47, origin.y + 12, true);
        this.setCell(origin.x + 38, origin.y + 13, false);
        this.setCell(origin.x + 39, origin.y + 12, false);
        this.setCell(origin.x + 40, origin.y + 13, false);
        this.setCell(origin.x + 41, origin.y + 12, false);
        this.setCell(origin.x + 42, origin.y + 13, false);
        this.setCell(origin.x + 43, origin.y + 12, false);
        this.setCell(origin.x + 44, origin.y + 13, false);
        this.setCell(origin.x + 45, origin.y + 12, false);
        this.setCell(origin.x + 22, origin.y + 14, false);
        this.setCell(origin.x + 21, origin.y + 15, false);
        this.setCell(origin.x + 20, origin.y + 14, false);
        this.setCell(origin.x + 19, origin.y + 15, false);
        this.setCell(origin.x + 18, origin.y + 14, false);
        this.setCell(origin.x + 17, origin.y + 15, false);
        this.setCell(origin.x + 16, origin.y + 14, false);
        this.setCell(origin.x + 15, origin.y + 15, false);
        this.setCell(origin.x + 14, origin.y + 14, false);
    }

    public initPuffer(origin: { x: number, y: number }) {
        this.setCell(origin.x + 5, origin.y + 1, true);
        this.setCell(origin.x + 6, origin.y + 1, true);
        this.setCell(origin.x + 7, origin.y + 1, true);
        this.setCell(origin.x + 8, origin.y + 1, true);
        this.setCell(origin.x + 8, origin.y + 2, true);
        this.setCell(origin.x + 8, origin.y + 3, true);
        this.setCell(origin.x + 7, origin.y + 4, true);
        this.setCell(origin.x + 4, origin.y + 2, true);
        this.setCell(origin.x + 4, origin.y + 4, true);
        this.setCell(origin.x + 5, origin.y + 7, true);
        this.setCell(origin.x + 6, origin.y + 8, true);
        this.setCell(origin.x + 6, origin.y + 9, true);
        this.setCell(origin.x + 6, origin.y + 10, true);
        this.setCell(origin.x + 5, origin.y + 10, true);
        this.setCell(origin.x + 4, origin.y + 11, true);
        this.setCell(origin.x + 5, origin.y + 15, true);
        this.setCell(origin.x + 4, origin.y + 16, true);
        this.setCell(origin.x + 6, origin.y + 15, true);
        this.setCell(origin.x + 7, origin.y + 15, true);
        this.setCell(origin.x + 8, origin.y + 15, true);
        this.setCell(origin.x + 8, origin.y + 16, true);
        this.setCell(origin.x + 8, origin.y + 17, true);
        this.setCell(origin.x + 7, origin.y + 18, true);
        this.setCell(origin.x + 4, origin.y + 18, true);
    }

    private emptyVect(dim: number) {
        var vect: boolean[] = [];
        for (var i = 0; i < dim; i++) {
            vect.push(false);
        }
        return vect;
    }

    public next() {
        var newGrid: Array<boolean[]> = [];
        for (var i = 0; i < this.grid.length; i++)
            newGrid[i] = this.grid[i].slice();

        for (var x = 0; x < this.grid.length; x++) {
            for (var y = 0; y < this.grid.length; y++) {

                var isalive = this.getCell(x, y);
                var nbAlive = this.aliveAround(x, y);
                if (isalive) {
                    if (nbAlive === 2 || nbAlive === 3) {
                        newGrid[x][y] = true;
                    }
                    else {
                        newGrid[x][y] = false;
                    }
                }
                else {
                    if (nbAlive === 3) {
                        newGrid[x][y] = true;
                    }
                }
            }
        }
        this.grid = newGrid;
    }

    public reset() {
        this.grid.length = 0;
    }

    public getCell(x: number, y: number) {
        let gx = this.grid[x];
        if (gx != null) {
            return gx[y];
        }
        return null;
    }

    public setCell(x: number, y: number, state: boolean) {
        console.log(`this.setCell(origin.x + ${x}, origin.y + ${y}, ${state});`);
        this.grid[x][y] = state;
    }

    public aliveAround(x, y) {
        let states: boolean[] = [];
        states.push(this.getCell(x - 1, y - 1));
        states.push(this.getCell(x, y - 1));
        states.push(this.getCell(x + 1, y - 1));
        states.push(this.getCell(x + 1, y));
        states.push(this.getCell(x + 1, y + 1));
        states.push(this.getCell(x, y + 1));
        states.push(this.getCell(x - 1, y + 1));
        states.push(this.getCell(x - 1, y));
        return states.filter(state => state === true).length;
    }
}