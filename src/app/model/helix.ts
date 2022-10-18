export class Helix {

    public *helixIterator() {
        let k = 20;
        let start = 2;
        let end = -4;
        for (let x = start; x >= end; x -= 0.001) {
            let module = Math.exp(x * Math.log(Math.abs(x)))
            let Re = module * Math.cos(x * (this.arg(x) + 2 * k * Math.PI))
            let Im = module * Math.sin(x * (this.arg(x) + 2 * k * Math.PI))
            yield { x, Re, Im };
        }
    }

    private arg(x: number) {
        return x < 0 ? Math.PI : 0
    }
}
