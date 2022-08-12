class Node {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color('gray');
        this.focused = false;
    }

    draw(nodeDiameter) {
        strokeWeight(nodeDiameter);
        if(this.focused) this.changeColor('cyan');
        else if(this.isHovered(nodeDiameter)) this.changeColor('red');
        else this.changeColor(255);
        stroke(this.color);
        point(this.x, this.y);
        textSize(11);
        strokeWeight(0);
        text(this.id, this.x, this.y);
    }

    distanceTo(destination) {
        const dx = destination.x - this.x,
            dy = destination.y - this.y;
        return Math.hypot(dx, dy);
    }

    changeColor(value) {
        this.color = color(value);
    }

    isHovered(diameter) {
        return 4 * (Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2)) <= Math.pow(diameter, 2);
    }

    focus() {
        this.focused = true;
    }

    unfocus() {
        this.focused = false;
    }

    toString() {
        return '${this.id}: (${this.x},$this.y)';
    }

    /* get focused() {
        return this.focused;
    } */
}