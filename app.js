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

const teamMembers = [];
//const employee = new employee(answers.employeeName, answers.employeeId, answers.employeeEmail);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function teamQuestions() {
    console.log("Answer the questions to build your team");
    function createTeammember() {

    inquirer.prompt([
        {
            type: "list",
            name: "position",
            message: "What position does this team member have?",
            choices: [
                "Manager",
                "Intern",
                "Engineer"
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.position) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                            
        }
    });
}
    function employeeQuests() {
        console.log("Adding new employee...");
        function createTeammember() {

    inquirer.prompt([
        {
            type: "list",
            name: "position",
            message: "What position does this team member have?",
            choices: [
                "Manager",
                "Intern",
                "Engineer"
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.position) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                            
        }
    });
}
        inquirer.prompt([
            {
                type: "input",
                name: "employeeName",
                message: "What is your employee's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "employeeId",
                message: "What is your employee's id?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "employeeEmail",
                message: "What is your employee's email?",

                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
            }
        

    
]).then(answers => {
    
    console.log("answers is:" + answers.employeeName);
    employeeName = answers.employeeName
    employeeId = answers.employeeId
    employeeEmail = answers.employeeEmail
    createTeammember();
});

//questions specific to the positions here
function addManager() {
    inquirer.prompt([
{
    type: "input",
    name: "managerOfficeNumber",
    message: "What is this manager's office number?",
    validate: answer => {
        const pass = answer.match(
            /^[1-9]\d*$/
        );
        if (pass) {
            return true;
        }
        return "Please enter a positive number greater than zero.";
    }
}
]).then(answers => {
    const manager = new Manager(employeeName, employeeId, employeeEmail, answers.managerOfficeNumber);
    teamMembers.push(manager);
    console.log(teamMembers)
    addMoreQuest();
});
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerGithub",
            message: "What is this engineer's GitHub username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(answers => {
        const engineer = new Engineer(employeeName, employeeId, employeeEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        console.log(teamMembers)
        addMoreQuest();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internSchool",
            message: "What college did the intern go to?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(answers => {
        const intern = new Intern(employeeName, employeeId, employeeEmail, answers.internSchool);
        teamMembers.push(intern);
        console.log(teamMembers)
        addMoreQuest();
    });
}
function addMoreQuest(){
    inquirer.prompt([
        {
            type: "list",
            name: "addMore",
            message: "Add more employees?",
            choices: [
                "Yes",
                "No",
            ]
        }
    ]).then(addMore => {
        switch (addMore.addMore) {
            case "Yes":
                employeeQuests()
                break;
            case "No":
                whatevermybuildfunctiongetsnamedlater();

            }
});
}
}
    employeeQuests()
    
}

    


teamQuestions();
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
