"use strict";

import * as fs from "fs";

let tasksTxt: string = "";
let taskList: string[] = [];
tasksTxt = fs.readFileSync("tasks.txt", "utf8");
taskList = tasksTxt.split("\n");
const usageText = fs.readFileSync("usage.txt", "utf8");

try {
  if (process.argv.length === 2) {
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
      throw new Error("Unable to add: no task provided");
    } else {
      fs.appendFileSync("tasks.txt", `\n[ ] ${process.argv[3]}`);
    }
  } else if (process.argv[2] === "-r") {
    let taskPointerNumber;
    if (process.argv[3]) {
      taskPointerNumber = process.argv[3].split(",").map(Number);
    } else if (!process.argv[3]) {
      throw new Error("Unable to remove: no index provided");
    } else if (taskPointerNumber[0] > taskList.length - 1) {
      throw new Error("Unable to remove: index is out of bound");
    } else if (typeof process.argv[3] !== "number") {
      throw new Error("Unable to remove: index is not a number");
    } else {
      taskList.splice(taskPointerNumber[0] - 1, 1);
      const newList: string = taskList.join("\n");
      fs.writeFileSync("tasks.txt", newList);
    }
  } else if (process.argv[2] === "-c") {
    let taskPointerNumber;
    if (process.argv[3]) {
      taskPointerNumber = process.argv[3].split(",").map(Number);
    } else if (!process.argv[3]) {
      throw new Error("Unable to remove: no index provided");
    } else if (taskPointerNumber[0] > taskList.length - 1) {
      throw new Error("Unable to remove: index is out of bound");
    } else if (typeof process.argv[3] !== "number") {
      throw new Error("Unable to remove: index is not a number");
    } else {
      const pointedTask = taskList[taskPointerNumber[0] - 1].split("");
      pointedTask[1] = "X";
      const newPTask = pointedTask.join("");
      taskList[taskPointerNumber[0] - 1] = newPTask;
      const newList: string = taskList.join("\n");
      fs.writeFileSync("tasks.txt", newList);
    }
  } else if (process.argv[2] !== "-l" || "-r" || "-a" || "-c") {
    throw new Error("Unsupported argument\n") && console.log(usageText);
  }
} catch (Error) {
  console.log(Error.message);
}
