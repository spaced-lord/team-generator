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

 
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
