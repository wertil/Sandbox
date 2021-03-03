//start watcher:  tsc app.ts -w

type Channel = 1 | 2 | 3;

let program: Channel = 3;

let inTypescript: boolean = true;
let numberList: number[] = [1, 2, 3, 4, 5];
let numberList2: (number | string)[] = [1, 2, 3, 4, 5, "hlala"];

let thingToWatch = "Vlaljadf"; // implicit string type
let thingToWatch2: string | object = "Vlaljadf";

thingToWatch2 = {};

let saySomething = (stuff: string): string => {
  return "lets all watch".concat(stuff).concat(" Today.");
};

saySomething(thingToWatch);

export {};
