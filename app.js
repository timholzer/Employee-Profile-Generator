//adding all the required things
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//the output of the final file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//html to render
const render = require("./lib/htmlRenderer");



//array of the team members
const teamMembers = [];

//inquiirer prompt
function teamQuestions() {
    console.log("Answer the questions to build your team");

    function employeeQuests() {
        console.log("Adding new employee...");
//questions that are the same for every position
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
    
    employeeName = answers.employeeName
    employeeId = answers.employeeId
    employeeEmail = answers.employeeEmail
    createTeammember();
});

//picking the employee postion
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
        //in order to feed the right postion questions
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
//questions specific to the positions here
function addManager() {
    inquirer.prompt([
{
    type: "input",
    name: "managerOfficeNumber",
    message: "What is this manager's office number?",
    validate: answer => {
        if (answer !== "") {
            return true;
        }
        return "Please enter at least one character.";
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
//asking if the user wants to add more employees
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
                console.log("you chose to add no more");
                //decided to leave my placeholder function name for building the html in for fun ¯\_(ツ)_/¯
                whatevermybuildfunctiongetsnamedlater();

            }
});
}
}

    employeeQuests()
    
}

 teamQuestions();
 //building the html file
function whatevermybuildfunctiongetsnamedlater() {
    console.log("writing file");
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    console.log("file wrote");


}


