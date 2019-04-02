export abstract class RendererComponent {

    private frameID: number;

    public startAnimation() {
        if (this.frameID) {
            this.cancelAnimation();
        }
        else {
            this.animate();
        }
    }

    public animate(timestamp?: number) {
        this.frameID = requestAnimationFrame(timestamp => this.animate(timestamp));
        this.repaint(timestamp);
    }

    public cancelAnimation() {
        if (this.frameID) {
            cancelAnimationFrame(this.frameID);
            this.frameID = null;
        }
    }

    public abstract repaint(timestamp?: number);
}