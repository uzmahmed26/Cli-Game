#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Define color constants
const welcomeColor = chalk.rgb(246, 123, 127).bold;
const inputColor = chalk.rgb(28, 234, 79).bold;
const opponentColor = chalk.rgb(12, 27, 80).bold;
const attackColor = chalk.rgb(232, 20, 203);
const playerFuelColor = chalk.rgb(224, 123, 125);
const opponentFuelColor = chalk.rgb(0, 255, 255);
const winColor = chalk.rgb(231, 140, 15);
const potionColor = chalk.rgb(131, 97, 74);
const loseColor = chalk.rgb(231, 140, 15);
const playerWinColor = chalk.rgb(188, 83, 84).bold;
const opponentWinColor = chalk.rgb(0, 128, 0).bold;

// Player class
class Player {
  name;
  fuel = 100;
  constructor(name:any) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}

// Opponent class
class Opponent {
  name;
  fuel = 100;
  constructor(name:any) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
}

console.log(welcomeColor("\t \n Welcome to Uzma CLI Adventure Game \n "));

// Method to get player name
const player = await inquirer.prompt([
  {
    name: "name",
    type: "input",
    message: inputColor("\t \n Please Enter your name:"),
  },
]);

// Method to get opponent name
const opponent = await inquirer.prompt([
  {
    name: "select",
    type: "list",
    message: opponentColor(" \t \n Select your Opponent "),
    choices: ["Skeleton", "Zombie", "Assassin"],
  },
]);

// Gather data from user
const p1 = new Player(player.name);
const o1 = new Opponent(opponent.select);
console.log(chalk.magenta.bold(`\t ${player.name} VS ${opponent.select}`));

// Function to handle the game logic
async function gameLoop() {
  while (true) {
    let ask = await inquirer.prompt([
      {
        name: "opt",
        type: "list",
        message: attackColor("\t \n Select Your Option: \n"),
        choices: ["Attack", "Drink Potion", "Run for Your life..."],
      },
    ]);

    if (ask.opt === "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(playerFuelColor(`${p1.name} has ${p1.fuel} fuel left`));
        console.log(opponentFuelColor(`${o1.name} has ${o1.fuel} fuel left`));
        if (p1.fuel <= 0) {
          console.log(winColor("\t You Lose, Better Luck Next Time"));
          process.exit();
        }
      } else {
        o1.fuelDecrease();
        console.log(playerWinColor(`${p1.name} has ${p1.fuel} fuel left`));
        console.log(opponentWinColor(`${o1.name} has ${o1.fuel} fuel left`));
        if (o1.fuel <= 0) {
          console.log(winColor("\t You Win, Congratulations!"));
          process.exit();
        }
      }
    } else if (ask.opt === "Drink Potion") {
      p1.fuelIncrease();
      console.log(potionColor(`\t You Drink Health Potion So Your Fuel is ${p1.fuel}`));
    } else if (ask.opt === "Run for Your life...") {
      console.log(loseColor("\t You Lose, Better Luck Next Time"));
      process.exit();
    }
  }
}

// Start the game loop
gameLoop();