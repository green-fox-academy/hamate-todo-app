"use strict";

import * as fs from "fs";

let tasksTxt: string = "";
let taskList: string [] = [];
tasksTxt = fs.readFileSync("tasks.txt", "utf8");
taskList = tasksTxt.split("\n");

if (process.argv.length === 2) {
  const usageText = fs.readFileSync("usage.txt", "utf8");
  console.log(usageText);
} else if (process.argv[2] === "-l") {
  if (tasksTxt.length === 0) {
    console.log("No todos for today! :)");
  } else {
    for (let i: number = 0; i < taskList.length; i++) {
      console.log(`${i + 1} - ${taskList[i]}`);
    }
  }
} else if (process.argv[2] === "-a") {
  if (!process.argv[3]) {
    console.log("Unable to add: no task provided");
  } else {
    fs.appendFileSync("tasks.txt", `\n${process.argv[3]}`);
  }
} else if (process.argv[2] === "-r") {
  if (!process.argv[3]) {
    console.log("Unable to remove: no index provided");
  } else {
    const arr = process.argv[3].split(',').map(Number);
    taskList.splice(arr[0] - 1, 1);
    const newList: string = taskList.join('\n');
    fs.writeFileSync('tasks.txt', newList);
  }
} else if (process.argv[2] === "-c") {
}
