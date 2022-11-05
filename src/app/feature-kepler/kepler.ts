export class Kepler {



    private r = 0;
    private v = 0;

    private step = 0.05;

    constructor(private readonly a: number, private readonly e: number) {
        this.reset();
    }

    public next() {
        this.r = this.a * (1 - Math.pow(this.e, 2)) / (1 + this.e * Math.cos(this.v));
        this.v += this.step;
        return { r: this.r, v: this.v }
    }

    public isStabilized() {
        return false;
    }

    public reset() {

    }

    public isEpsilon(number) {
        return false;
    }
}