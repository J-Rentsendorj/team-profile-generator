const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');
const fs = require('fs');

const teamArray = [];

function promptManager() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the manager name:',
            validate: (input) => input ? true : 'Manager name cannot be blank.'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the manager ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the manager email:',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the manager office number:',
        },
    ])
        .then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamArray.push(manager);
        });
}
function promptMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an option:',
            choices: ['Add Engineer', 'Add Intern', 'Finish Building Team']
        }
    ])
        .then(userChoice => {
            switch (userChoice.action) {
                case 'Add Engineer':
                    return promptEngineer();
                case 'Add Intern':
                    return promptIntern();
                default:
                    return buildTeam();
            }
        });
}
function promptEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the engineer name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the engineer ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the engineer email:',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the engineer GitHub username:',
        },
    ])
        .then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamArray.push(engineer);
            promptMenu();
        });
}
function promptIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the intern name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the intern ID:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the intern email:',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter the intern school:',
        },
    ])
        .then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamArray.push(intern);
            promptMenu();
        });
}
function buildTeam() {
    const htmlContent = generateHTML(teamArray);

    fs.writeFile('./dist/team.html', htmlContent, (err) =>
        err ? console.log(err) : console.log('Successfully created team.html!')
    );
}

promptManager().then(promptMenu);
