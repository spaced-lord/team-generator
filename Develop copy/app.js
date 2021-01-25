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
let empId = 1;
let empInfo = {};

// ARRAY OF QUESTIONS

let questions = [
  {
    type: "input",
    message: "Enter Employee Name.",
    name: "name",
  },
  {
    type: "input",
    message: "Enter Employee email",
    name: "email",
  },
  {
    message: "Employee Role",
    name: "specificQuestion",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: ["Engineer", "Intern", "None to add"],
  },
];

// START INQUIRER

let newEmpQuestion = (specificQuestion, role) => {
  questions[2].message = specificQuestion;

  inquirer.prompt(questions).then((response) => {
    empInfo = {};

    empInfo.name = response.name;

    empInfo.email = response.email;

    empInfo.specificQuestion = response.specificQuestion;

    empInfo.role = role;

    empInfo.id = empId;

    storeEmployees(empInfo, response.role);
  });
};

// USING IF STATEMENT TO COVER ALL POSSIBILITIES
let storeEmp = (employees, nextEmp) => {
  if (employees.role === "Manager") {
    var newEmployee = new Manager(
      employee.name,
      employee.id,
      employee.email,
      employee.specificQuestion
    );
  } else if (employee.role === "Engineer") {
    var newEmployee = new Engineer(
      employee.name,
      employee.id,
      employee.email,
      employee.specificQuestion
    );
  } else {
    var newEmployee = new Intern(
      employee.name,
      employee.id,
      employee.email,
      employee.specificQuestion
    );
  }

  empArrray.push(newEmployee);

  empId++;

  //  SWITCH STATEMENT
  switch (nextEmp) {
    case "Manager":
      newEmpQuestion("What is the employee's office number?", "Manager");
      break;
    case "Engineer":
      newEmpQuestion("What is the employee's Github username?", "Engineer");
      break;
    case "Intern":
      newEmpQuestion("Which school did the employee attend?", "Intern");
      break;
    case "None to add":
      let htmlRenderer = render(empArray);
      writeHTML(htmlRenderer);
    default:
      return;
  }
};

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
