export interface InitialConditions {
    x: number;
    y: number;
    z: number;
}

export interface Parameters {
    w: number;
    r: number;
    b: number;
}

export class Lorenz {

    private x = 0;
    private y = 0;
    private z = 0;
    private vx = 0;
    private vy = 0;
    private vz = 0;
    private timestep = 0.1;

    constructor(private cond: InitialConditions, private parameters: Parameters) {
        this.reset();
    }

    public next() {
        this.vx = this.parameters.w * (this.y - this.x) * this.timestep;
        this.vy = (this.parameters.r * this.x - this.y - this.x * this.z) * this.timestep;
        this.vz = (-this.parameters.b * this.z + this.x * this.y) * this.timestep;

        this.x += this.vx * this.timestep;
        this.y += this.vy * this.timestep;
        this.z += this.vz * this.timestep;

        return { x: this.x, y: this.y, z: this.z };
    }

    public isStabilized() {
        return false;
    }

    public reset() {
        this.x = this.cond.x;
        this.y = this.cond.y;
        this.z = this.cond.z;
    }

    public isEpsilon(number) {
        return false;
    }
}