class Element {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(node, priority) {
        var element = new Element(node, priority);
        var contained = false;

        for(var i = 0; i < this.queue.length; i++) {
            if(this.queue[i].priority > element.priority) {
                this.queue.splice(i, 0, element);
                contained = true;
                break;
            }
            if(!contained)
                this.queue.push(element);
        }
    }

    dequeue() {
        if(this.queue.isEmpty()) return "underflow";
        return this.queue.shift();
    }

    peekFront() {
        if(this.queue.isEmpty()) return "queue empty";
        return this.queue[0];
    }

    peekRear() {
        if(this.queue.isEmpty()) return "queue empty";
        return this.queue[this.queue.length - 1];
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    print() {
        var outString = "{";
        for(var i = 0; i < this.queue.length; i++) {
            outString += (
                i < this.queue.length - 1 ? 
                this.queue[i] + ", " :
                this.queue[i] + "}"
            );
        }
        return outString;
    }
}