class Node {
    constructor(x, y, id) {
        this.x = x;     //horizontal position
        this.y = y;     //vertical position
        this.id = id;   //numerical identifier
        this.color = color(255); //color representing node state
        this.focused = false;   //true if node is focused for more information
    }

    draw(nodeDiameter) {
        strokeWeight(nodeDiameter);
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
        var check =  4 * (Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2)) <= Math.pow(diameter, 2);
        this.changeColor(check && !this.focused ? 'red' : 
            this.focused ? 'cyan' : 255);
        return check;
    }

    equals(node) {
        return this.x === node.x && this.y === node.y && this.id === node.id;
    }

    focus() {
        this.focused = true;
    }

    unfocus() {
        this.focused = false;
    }

    isFocused() {
        return this.focused;
    }

    toString() {
        return '${this.id}: (${this.x},$this.y)';
    }

    /* get focused() {
        return this.focused;
    } */
}