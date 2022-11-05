export interface Ant {
    x: number;
    y: number;
    dir: 'n' | 's' | 'e' | 'w';
    color: string;
}

export class Langton {

    public grid: Array<number[]> = [];
    public gridSize = 200;

    public ants: Array<Ant> = [
        { x: 75, y: 50, dir: 'w', color: 'blue' },
        //  { x: 130, y: 100, dir: 'e', color: 'green' },
        //  { x: 75, y: 140, dir: 's', color: 'orange' }
    ];

    constructor() {

        var matrix = [];
        for (var i = 0; i < this.gridSize; i++) {
            matrix[i] = this.emptyVect(this.gridSize);
        }
        this.grid = matrix;
    }

    private emptyVect(dim: number) {
        var vect: number[] = [];
        for (var i = 0; i < dim; i++) {
            vect.push(0);
        }
        return vect;
    }

    public evolve() {
        this.ants.slice().forEach((ant, i) => {
            let isInside = true;
            if (this.getCell(ant) === 1) {
                this.toLeft(ant);
                this.setCell(ant, 0);
                isInside = this.move(ant);
            }
            else {
                this.toRight(ant);
                this.setCell(ant, 1);
                isInside = this.move(ant);
            }
            if (!isInside) {
                this.ants.splice(i, 1);
            }
        });
    }

    public contains(point: { x: number, y: number }) {
        return point.x < this.gridSize && point.x >= 0 && point.y < this.gridSize && point.y >= 0;
    }

    public getCell(point: { x: number, y: number }) {
        if (this.contains(point)) {
            return this.grid[point.x][point.y];
        }
    }

    public setCell(point: { x: number, y: number }, value: number) {
        if (this.contains(point)) {
            this.grid[point.x][point.y] = value;
        }
    }

    public toLeft(ant: Ant) {
        switch (ant.dir) {
            case 'n':
                ant.dir = 'w';
                break;
            case 'w':
                ant.dir = 's';
                break;
            case 'e':
                ant.dir = 'n';
                break;
            case 's':
                ant.dir = 'e';
                break;
        }
    }

    public toRight(ant: Ant) {
        switch (ant.dir) {
            case 'n':
                ant.dir = 'e';
                break;
            case 'w':
                ant.dir = 'n';
                break;
            case 'e':
                ant.dir = 's';
                break;
            case 's':
                ant.dir = 'w';
                break;
        }
    }

    public move(ant: Ant) {
        switch (ant.dir) {
            case 'n':
                ant.y--;
                break;
            case 'w':
                ant.x--;
                break;
            case 'e':
                ant.x++;
                break;
            case 's':
                ant.y++;
                break;
        }
        if (ant.x < 0 || ant.y < 0)
            return false;

        if (ant.x >= this.gridSize || ant.y >= this.gridSize)
            return false;

        return true;
    }
}