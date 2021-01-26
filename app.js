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

// ARRAY OF QUESTIONS

let questions = [
  {
    type: "input",
    message: "Enter Employee Name.",
    name: "name",
  },
  {
    type: "input",
    message: "Enter Employee id",
    name: "id",
  },
  {
    type: "input",
    message: "Enter Employee email",
    name: "email",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

let mgrQuestions = [
  {
    type: "input",
    message: "What is the manager's office number?",
    name: "office",
  },
  {
    type: "confirm",
    message: "Would you like to add another employee?"["Y/N"],
    name: "newEmp",
  },
];

let engQuestions = [
  {
    type: "input",
    message: "What is the Engineer's Github username?",
    name: "github",
  },
  {
    type: "confirm",
    message: "Would you like to add another employee?"["Y/N"],
    name: "newEmp",
  },
];

let intQuestions = [
  {
    type: "input",
    message: "At which school is the intern enrolled?",
    name: "school",
  },
  {
    type: "confirm",
    message: "Would you like to add another employee?"["Y/N"],
    name: "newEmp",
  },
];

// START INQUIRER
const run = async () => {
  do {
    const answers = await inquierer.prompt(questions);
    let answersTwo;
    const { name, id, email } = answers;
    let newEmp;

    //  SWITCH STATEMENT
    switch (answers.role) {
      case "Manager":
        answersTwo = await inquierer.prompt(mgrQuestions);
        const { office } = answersTwo;
        newEmployee = new Manager(name, id, email, office);
        break;
      case "Engineer":
        answersTwo = await inquierer.prompt(engQuestions);
        const { github } = answersTwo;
        newEmployee = new Engineer(name, id, email, github);
        break;
      case "Intern":
        answersTwo = await inquierer.prompt(intQuestions);
        const { school } = new Intern(name, id, email, school);
        break;
    }

    empArray.push(newEmployee);
    newEmp = answersTwo.newEmp;
  } while (newEmp == true);

  // FS WRITE HTML

  let writeHTML = (htmlRenderer) => {
    fs.writeFile(outputPath, htmlRenderer, (err) => {
      if (err) {
        console.log("ERROR!");
      } else {
        console.log("Rendering File");
      }
    });
  };
};
