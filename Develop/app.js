const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// array for team creation
const eeTeam = [];

async function inti() {
    proManager();
}

const proManager = () => {
    console.log("Fill out the prompts and I'll generate a team profile!")
    inquirer
        .prompt([{
            type: "input",
            name: "manager",
            message: "Manager's Name:"
        },
        {
            type: "input",
            name: "managerId",
            message: "Manager ID:"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Manager Email:",
        },
        {
            type: "input",
            name: "managerOffice",
            message: "Manager Office Number:"
        }
    ])

    .then(function(input) {
        console.log("manager");
        const manager = new Manager(input.manager, input.managerId, input.managerEmail, input.managerOffice)
        eeTeam.push(manager);

        buildTeam();
    });
}


//Prompts to add a team members
function createTeam() {
    inquirer.prompt([{
        type: "list",
        name: "build",
        message: "What team members would you like to add to your team?  If you have completed building your team, select Done.",
        choices: ["Add an Engineer!", "Add an Intern!", "Done!"]
    }])

    .then(answers => {
        switch (answers.build) {
            case "Add an Engineer!":
                {
                    proEngineer();
                    break;
                }
            case "Add an Intern!":
                {
                    proIntern();
                    break;
                }
            case "Done!":
                {
                    buildTeam();
                    break;
                }
        }
    })
}

const proEngineer = () => {
    inquirer
        .prompt([{
            type: "input",
            name: "engineer",
            message: "Engineer's Name:"
        },
        {
            type: "input",
            name: "engineerId",
            message: "Engineer ID:"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Engineer's Email:"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "Engineer's GitHub username:"
        },
    ])

    .then(function(input) {
        console.log("engineer");
        const engineer = new Engineer(input.engineer, input.engineerId, input.engineerEmail, input.engineerGithub)
        eeTeam.push(engineer);

        createTeam();
    });
}

//add intern
const proIntern = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "intern",
                message: "Intern's Name: ",
            },
            {
                type: "input",
                name: "internId",
                message: "Intern's ID: ",
            },
            {
                type: "input",
                name: "internEmail",
                message: "Intern's Email: ",
            },
            {
                type: "input",
                name: "internSchool",
                message: "School the Intern is currently attending: ",
            },
        ])

    // push intern to team array
    .then(function(input) {
        console.log("intern");
        const intern = new Intern(input.intern, input.internId, input.internEmail, input.internSchool)
        eeTeam.push(intern);

        buildTeam();
    });
}

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
