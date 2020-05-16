class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(newItem) 
    {
        this.items.push({...newItem});
    }

    dequeue()
    {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    isEmpty()
    {
        return (this.items.length > 0 ? false : true)  
    }
}

export default Queue;