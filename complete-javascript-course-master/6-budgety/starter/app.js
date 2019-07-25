// Budget Controler
////////////////////////////
var budgetController = (function () {

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val){
            var newItem, ID;

            // create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }
            

            // create new item base on inc or exp type
            if(type === 'exp') {
               newItem = new Expense(ID, des, val); 
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // push it into the data structure
            data.allItems[type].push(newItem);

            // return new element
            return newItem;
            
        },

        testing: function(){
            console.log(data)
        }
    }

})();


// UI Controller
////////////////////////////
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        description: '.add__description',
        value: '.add__value',
        button: '.add__btn'
    }

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.description).value,
                value: document.querySelector(DOMstrings.value).value
            }


        },

        getDOMStrings: function () {
            return DOMstrings;
        }
    }

})();


// Global App Controller
////////////////////////////
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.button).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. get field input data
        input = UIController.getInput();

        // 2. Add item to budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value)

        // 3. add item to UI
        // 4. calculate budget
        // 5. display budget on the UI
    };

    return {
        init: function(){
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

