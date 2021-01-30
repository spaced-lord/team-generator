const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { report } = require("process");

// GLOBAL VARIABLES
let empArray = [];

// QUESTION ARRAYS

let questions = [
  {
    type: "input",
    message: "Enter Employee Name.",
    name: "name",
  },
  {
    type: "input",
    message: "Enter Employee id.",
    name: "id",
  },
  {
    type: "input",
    message: "Enter Employee email.",
    name: "email",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "role",
  },
];

let mgrQuestions = [
  {
    type: "input",
    message: "What is the manager's office number?",
    name: "office",
  },
];

let engQuestions = [
  {
    type: "input",
    message: "What is the Engineer's Github username?",
    name: "github",
  },
];

let intQuestions = [
  {
    type: "input",
    message: "At which school is the intern enrolled?",
    name: "school",
  },
];

let newEmp = [
  {
    type: "confirm",
    message: "Would you like to add another employee?"["Y/N"],
    name: "newEmp",
  },
];

// START INQUIRER
const run = async () => {
  do {
    const answers = await inquirer.prompt(questions);
    let answersTwo;
    const { name, id, email } = answers;
    let newEmp;

    //  SWITCH STATEMENT
    switch (answers.role) {
      case "Manager":
        answersTwo = await inquirer.prompt(mgrQuestions);
        const { office } = answersTwo;
        newEmployee = new Manager(name, id, email, office);
        break;
      case "Engineer":
        answersTwo = await inquirer.prompt(engQuestions);
        const { github } = answersTwo;
        newEmployee = new Engineer(name, id, email, github);
        break;
      case "Intern":
        answersTwo = await inquirer.prompt(intQuestions);
        const { school } = answersTwo;
        newEmployee = new Intern(name, id, email, school);
        break;
    }

    empArray.push(newEmployee);
    newEmployee = answersTwo.newEmp;
  } while ("newEmp" == true);

  // FS WRITE HTML

  let writeHTML = (htmlRenderer) => {
    fs.writeFile(outputPath, htmlRenderer, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Rendering File");
      }
    });
  };
};

run();
