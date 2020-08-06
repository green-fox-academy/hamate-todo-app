"use strict";

import * as fs from "fs";

console.log(process.argv);

if (process.argv.length === 2) {
  const usageText = fs.readFileSync("usage.txt", "utf8");
  console.log(usageText);
} else if (process.argv[process.argv.length - 1] === "-l") {
  const tasksTxt = fs.readFileSync("tasks.txt", "utf8");
  if (tasksTxt.length === 0) {
    console.log("No todos for today! :)");
  } else {
    const taskList = tasksTxt.split("\n");
    for (let i: number = 0; i < taskList.length; i++) {
      console.log(`${i + 1} - ${taskList[i]}`);
    }
  }
} else if (process.argv[process.argv.length - 1] === "-a") {
} else if (process.argv[process.argv.length - 1] === "-r") {
} else if (process.argv[process.argv.length - 1] === "-c") {
}
