class Queue {
  constructor(maxSize) {
    this.items = []; // array based queue
    this.maxSize = maxSize || Infinity; // queue size
  }

  enqueue(element) {
    if (this.isFull()) {
      return "Queue is full";
    }
    this.items.push(element);
  }

  dequeue() {
    return this.isEmpty() ? "Queue is empty" : this.items.shift();
  }

  peek() {
    return this.isEmpty() ? "Queue is empty" : this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  isFull() {
    return this.items.length >= this.maxSize;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.join());
  }
}

module.exports = Queue;
