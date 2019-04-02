
export interface Parameters {
    m1: number;
    l1: number;
    β1: number;
    m2: number;
    l2: number;
    β2: number;
}

export interface InitialConditions {
    θ1: number;
    v1: number;
    θ2: number;
    v2: number;
}

export class DoublePendulum {

    private readonly epsilon = 1e-2;
    private readonly g = 9.81;

    private θ1 = -Math.PI * 180 / 180;
    private v1 = 0;
    private a1 = 0;

    private θ2 = Math.PI * 90 / 180;
    private v2 = 0;
    private a2 = 0;

    private μ: number;

    constructor(private conditions: InitialConditions, private parameters: Parameters, private timestep = 1e-2) {
        this.μ = 1 + this.parameters.m1 / this.parameters.m2;
        this.reset();
    }

    public next() {
        this.a1 = -(-this.parameters.m1 * this.g * this.parameters.l1 * Math.sin(this.θ1) - this.parameters.m2 * this.g * this.parameters.l1 * Math.sin(this.θ1) - this.parameters.m2 * this.parameters.l1 * this.parameters.l2 * this.v2 * this.v2 * Math.sin(this.θ1 - this.θ2) + this.parameters.β2 * this.v2 - this.parameters.β2 * this.v1 - this.parameters.β1 * this.v1) / (this.parameters.l1 * this.parameters.l1 * (-this.parameters.m2 - this.parameters.m1 + this.parameters.m2 * Math.cos(this.θ1 - this.θ2) * Math.cos(this.θ1 - this.θ2))) + (Math.cos(this.θ1 - this.θ2) * (- this.parameters.β2 * this.v2 + this.parameters.m2 * this.parameters.l1 * this.v1 * this.v1 * this.parameters.l2 * Math.sin(this.θ1 - this.θ2) - this.parameters.m2 * this.g * this.parameters.l2 * Math.sin(this.θ2) + this.parameters.β2 * this.v1)) / (this.parameters.l1 * this.parameters.l2 - this.parameters.m2 - this.parameters.m1 + this.parameters.m2 * Math.cos(this.θ1 - this.θ2) * Math.cos(this.θ1 - this.θ2));
        this.v1 += this.a1 * this.timestep;
        this.θ1 += this.v1 * this.timestep;
        this.θ1 = this.θ1 % (2 * Math.PI);

        this.a2 = (Math.cos(this.θ1 - this.θ2) * (-this.parameters.m1 * this.g * this.parameters.l1 * Math.sin(this.θ1) - this.parameters.m2 * this.g * this.parameters.l1 * Math.sin(this.θ1) - this.parameters.m2 * this.parameters.l1 * this.parameters.l2 * this.v2 * this.v2 * Math.sin(this.θ1 - this.θ2) + this.parameters.β2 * this.v2 - this.parameters.β2 * this.v1 - this.parameters.β2 * this.v1)) / (this.parameters.l1 * this.parameters.l2 * (-this.parameters.m2 - this.parameters.m1 + this.parameters.m2 * Math.cos(this.θ1 - this.θ2) * Math.cos(this.θ1 - this.θ2))) - ((this.parameters.m1 + this.parameters.m2) * (-this.parameters.β2 * this.v2 + this.parameters.m2 * this.parameters.l1 * this.v1 * this.v1 * this.parameters.l2 * Math.sin(this.θ1 - this.θ2) - this.parameters.m2 * this.g * this.parameters.l2 * Math.sin(this.θ2) + this.parameters.β2 * this.v1)) / (this.parameters.l2 * this.parameters.l2 * (-this.parameters.m2 - this.parameters.m1 + this.parameters.m2 * Math.cos(this.θ1 - this.θ2) * Math.cos(this.θ1 - this.θ2)));
        this.v2 += this.a2 * this.timestep;
        this.θ2 += this.v2 * this.timestep;
        this.θ2 = this.θ2 % (2 * Math.PI);

        return { θ1: this.θ1, θ2: this.θ2 };
    }

    public isStabilized() {
        return this.isEpsilon(this.a1) && this.isEpsilon(this.v1) && this.isEpsilon(this.θ1) && this.isEpsilon(this.a2) && this.isEpsilon(this.v2) && this.isEpsilon(this.θ2);
    }

    public reset() {
        this.θ1 = this.conditions.θ1;
        this.v1 = this.conditions.v1;
        this.a1 = 0;
        this.θ2 = this.conditions.θ2;
        this.v2 = this.conditions.v2;
        this.a2 = 0;
    }

    public isEpsilon(number) {
        return Math.abs(number) < this.epsilon;
    }
}