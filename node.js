class Node {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color('gray');
    }

    distanceTo(destination) {
        const dx = destination.x - this.x,
            dy = destination.y - this.y;
        return Math.hypot(dx, dy);
    }

    changeColor(color) {
        this.color = color;
    }

    isHovered(diameter) {
        return Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2) <= diameter;
    }

    toString() {
        return '${this.id}: (${this.x},$this.y)';
    }
}