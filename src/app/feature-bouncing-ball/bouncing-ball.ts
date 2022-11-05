export interface InitialConditions {
    x: number;
    vx: number;
    y: number;
    vy: number;
}

export class BouncingBall {

    private readonly epsilon = 1e-2;
    private readonly g = 9.81;

    private x = 0;
    private vx = 0;
    private ax = 0;

    private y = 0;
    private vy = 0;
    private ay = 0;

    constructor(private conditions: InitialConditions, private timestep = 1e-2, private bounceCoef = 0.9, private damping = 1.1) {
        this.reset();
    }

    public next() {
        this.ay = -this.g;
        this.vy += this.ay * this.timestep;
        this.y += this.vy * this.timestep;

        this.ax = this.vx * this.timestep - this.damping * this.vx;
        this.vx += this.ax * this.timestep;
        this.x += this.vx * this.timestep;

        if (this.y <= 0) {
            this.bounce();
        }

        return { x: this.x, y: this.y };
    }

    public bounce() {
        this.vy = -this.bounceCoef * this.vy;
        this.y = 0;
    }

    public isStabilized() {
        return this.isEpsilon(this.ax, this.vx, this.vy, this.y);
    }

    public reset() {
        this.x = this.conditions.x;
        this.vx = this.conditions.vx;
        this.y = this.conditions.y;
        this.vy = this.conditions.vy;
    }

    public isEpsilon(...values: number[]) {
        return values.every(value => Math.abs(value) < this.epsilon);
    }
}