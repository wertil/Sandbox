
function Shape() {}
function Circle() {}

// Prototypical inheritance 
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle; 

function Rectangle(color) {
    // To call the super constructor 
    Shape.call(this, color);
}

// Method overriding 
Shape.prototype.draw = function() {}
Circle.prototype.draw = function() {
    // Call the base implementation 
    Shape.prototype.draw.call(this);

    // Do additional stuff here 
}

// Don't create large inheritance hierarchies. 
// One level of inheritance is fine. 

// Use mixins to combine multiple objects 
// and implement composition in JavaScript. 
const canEat = { 
    eat: function() {}
};

const canWalk = {
    walk: function() {}
};

function mixin(target, ...sources) {
    // Copies all the properties from all the source objects 
    // to the target object. 
    Object.assign(target, ...sources);
}

function Person() {}

mixin(Person.prototype, canEat, canWalk);


/// EXERCISE 1
function HtmlElement() {
    this.click = function () {
        console.log("click");
    }
}

HtmlElement.prototype.focus = function () {
    console.log("focus");
}

function HtmlSelectElement(items = []) {
    this.items = items
    this.addItems = function (item) {
        this.items.push(item)
    }
    this.removeItem = function (item) {
        this.items = this.items.filter(e => e !== item)
        //this.items.splice(this.items.indexOf(item),1)
    }
    this.render = function () {
        return `
                <select>${this.items.map(item => `
                    <option>${item}</option>`).join("")}
                </select>
                `
    }
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

function HtmlImageElement(image) {
    this.image = image
    this.render = function () {
        return `<img src="${this.image}">`
    }
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const elements = [
    new HtmlSelectElement([1, 2, 3]),
    new HtmlImageElement("https://")
]

for (let element of elements)
    console.log(element.render());