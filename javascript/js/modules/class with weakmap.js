const _items = new WeakMap();
class Stack {
    constructor() {
        _items.set(this, [])
    }

    peep(){
        const items = _items.get(this)
        if(items.length)
            return items[items.length - 1]
        throw Error("stack is empty")

    }
    pop(){
        const items = _items.get(this)
        if(items.length)
            this.count--
        return items.pop()
        throw Error("stack is empty")
    }
    push(obj){
        _items.get(this).push(obj)
    }

    get count() {
        return _items.get(this).length
    }
}

const stack = new Stack()