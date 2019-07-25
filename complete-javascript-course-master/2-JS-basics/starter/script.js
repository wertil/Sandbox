// for (var i = 1; i < 20; i += 2) {
//         console.log(i);
// }

var john = {
        firstName: 'John',
        bills: [124, 48, 268, 180, 42],
        tips: [],
        finalAmounts: [],
        tipsCalculator: function () {

                function tipCalculator(bill) {
                        var percentage;
                        if (bill < 50) {
                                percentage = .2;
                        } else if (bill >= 50 && bill < 200) {
                                percentage = .15;
                        } else {
                                percentage = .1;
                        }
                        return percentage * bill;
                }

                for (var i = 0; i < this.bills.length; i++) {
                        this.tips.push(tipCalculator(this.bills[i]));
                }
                for (var i = 0; i < this.tips.length; i++) {
                        this.finalAmounts.push(this.tips[i] + this.bills[i]);
                }
        }
}

john.tipsCalculator();
console.log(john.tips, john.finalAmounts)

var mark = {
        firstName: 'John',
        bills: [77, 375, 110, 45],
        tips: [],
        finalAmounts: [],
        tipsCalculator: function () {

                function tipCalculator(bill) {
                        var percentage;
                        if (bill < 100) {
                                percentage = .2;
                        } else if (bill >= 100 && bill < 300) {
                                percentage = .1;
                        } else {
                                percentage = .25;
                        }
                        return percentage * bill;
                }

                for (var i = 0; i < this.bills.length; i++) {
                        this.tips.push(tipCalculator(this.bills[i]));
                }
                for (var i = 0; i < this.tips.length; i++) {
                        this.finalAmounts.push(this.tips[i] + this.bills[i]);
                }
        }
}

mark.tipsCalculator();
console.log(mark.tips, mark.finalAmounts)

function tipAverage(tips) {
        var sum = 0;
        for (var i = 0; i < tips.length; i++) {
                sum += tips[i];
        }
        return sum / tips.length;
}

mark.average = tipAverage(mark.tips);

console.log(mark);

console.log(`John Tip's are on average $ ${tipAverage(john.tips)} vs Mark's tips of $ ${tipAverage(mark.tips)}`)