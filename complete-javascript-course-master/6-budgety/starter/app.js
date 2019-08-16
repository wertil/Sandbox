// Budget Controler
////////////////////////////
var budgetController = (function () {
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = - 1;
	};

	Expense.prototype.calcPercentage = function(totalIncome) {
		if(totalIncome > 0){
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}		
	}

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	}

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function (type) {
		var sum = 0;
		data.allItems[type].forEach(function (cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function (type, des, val) {
			var newItem, ID;

			// create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// create new item base on inc or exp type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// push it into the data structure
			data.allItems[type].push(newItem);

			// return new element
			return newItem;
		},

		deleteItem: function(type,id) {

			var ids, index;

			// create array with all ids of expense or income
			 ids = data.allItems[type].map(function(current){
				return current.id;
			});

			// find the index of the id
			index = ids.indexOf(id);

			// removed item from data object
			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}

		},

		calculateBudget: function () {

			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// calculate the budget: inocme - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// calculate the percentage of income spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}


		},

		calculatePercentages: function() {
			data.allItems.exp.forEach(function(cur){
				cur.calcPercentage(data.budget);
			})
		},

		getPercentages: function() {
			var allPerc = data.allItems.exp.map(function(cur){
				return cur.getPercentage();
			})
			return allPerc;
		},

		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},

		testing: function () {
			console.log(data);
		}
	};
})();

// UI Controller
////////////////////////////
var UIController = (function () {
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container'

	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription)
					.value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},

		addListItem: function (obj, type) {
			var html, newHtml, element;
			// create hmtl tstring with placeholder

			if (type == 'inc') {
				element = DOMstrings.incomeContainer;
				html = `<div class="item clearfix" id="inc-%id%">
				<div class="item__description">%description%</div>
				<div class="right clearfix">
					<div class="item__value">%value%</div>
					<div class="item__delete">
						<button class="item__delete--btn">
							<i class="ion-ios-close-outline" />
						</button>
					</div>
				</div>
            </div>`;
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = `<div class="item clearfix" id="exp-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
			}

			// repalce placeholder iwht actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// insert HMTL into DOM
			document
				.querySelector(element)
				.insertAdjacentHTML('beforeend', newHtml);
		},

		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function () {
			var fields, fieldsArr;
			fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function (current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();
		},

		displayBudget: function (obj) {

			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;


			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = `${obj.percentage}%`;
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}

		},

		getDOMStrings: function () {
			return DOMstrings;
		}
	};
})();

// Global App Controller
//////////////////////////// 
var controller = (function (budgetCtrl, UICtrl) {
	var setupEventListeners = function () {
		var DOM = UICtrl.getDOMStrings();

		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};

	var updateBudget = function () {

		// 1. calculate budget
		budgetCtrl.calculateBudget();

		// 2. return the budget
		var budget = budgetCtrl.getBudget();


		// 3. display budget on the UI
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function(){
		// 1. calculate percentages
		budgetCtrl.calculatePercentages();

		// 2. read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();
		console.log(percentages);

		// 3. Update UI

	};

	var ctrlAddItem = function () {
		var input, newItem;

		// 1. get field input data
		input = UICtrl.getInput();

		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

			// 2. Add item to budget controller
			newItem = budgetCtrl.addItem(
				input.type,
				input.description,
				input.value
			);

			// 3. add item to UI
			UICtrl.addListItem(newItem, input.type);

			// 4. clear Fields
			UICtrl.clearFields();

			// 5. caluclate at and update budget
			updateBudget();

			// 6. calc und update percentage
			updatePercentages();
		}



	};

	var ctrlDeleteItem = function(event){
		var itemID, splitID, type;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if(itemID){

			//inc-1
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1. delete item from data structure
			budgetCtrl.deleteItem(type,ID);

			// 2. delete from UI
			UICtrl.deleteListItem(itemID);

			// 3. update and show budget
			updateBudget();

			// 4. calc und update percentage
			updatePercentages();
		}
	};

	return {
		init: function () {
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: '---'
			});
			setupEventListeners();
		}
	};
})(budgetController, UIController);

controller.init();
