~~~javascript
//de.js constructor has key value property

let MyB = function () {
    this
    ._({
        t: 0,
    })
    ._(button.$("OK"))
    .on("click");
}._({
    click (e) {
        alert(this.t);
    }
});

$.body.$(new MyB());

//de.js constructor has array

let MyAB = function () {
    this
    ._([0,1,2,3,4,5])
    ._(button.$("OK"))
    .on("click");
}
._(Array)
._({
    click () {
        console.log(this[2]);
    }
});
~~~

~~~javascript
// pure javascript is

let MyB = function () {
    this.t = 0;
    this.$ = document.createElement("button");
    this.$.appendChild(new Text("OK"));
    this.$.on("click", this);
};

MyB.prototype.handleEvent = function (e) {
    this[e.type](e);
};

MyB.prototype.click = function (e) {
    alert(this.t);
};

document.body.appendChild(new MyB().$);

//Array

let MyAB = function () {
    [0, 1, 2, 3, 4, 5].forEach((v, k) => this[k] = v);
    this.$ = document.createElement("button");
    this.$.appendChild(new Text("OK"));
    this.$.on("click", this);
};

MyAB.prototype = Object.create(Array.prototype, {
    constructor: {
        configurable: true,
        value: MyAB
});

MyAB.prototype.handleEvent = function (e) {
    this[e.type](e);
};

MyAB.prototype.click = function () {
    console.log(this[2]);
};
~~~
