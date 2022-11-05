export class Pendulum {

    private readonly epsilon = 1e-2;
    private readonly g = 9.81;

    private position = 0;
    private velocity = 0;
    private acceleration = 0;

    constructor(private initialPosition: number, private initialVelocity: number, private length: number, private timestep = 1e-2, private damping = 0) {
        this.reset();
    }

    public next() {
        this.acceleration = -this.g / this.length * Math.sin(this.position) - this.damping * this.velocity;
        this.velocity += this.acceleration * this.timestep;
        this.position += this.velocity * this.timestep;
        return this.position;
    }

    public isStabilized() {
        return this.isEpsilon(this.acceleration) && this.isEpsilon(this.velocity) && this.isEpsilon(this.position)
    }

    public reset() {
        this.position = this.initialPosition;
        this.velocity = this.initialVelocity;
    }

    public isEpsilon(number) {
        return Math.abs(number) < this.epsilon;
    }
}