const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")

const writeToFileAsync = util.promisify(fs.writeFile)
// array of questions for user

const askQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "Title",
            message: "What do you want you title to be?"
        },
        {
            type: "input",
            name: "Description",
            message: "What do you want you description to be?"
        }
    ])
}
// function to write README file
function writeToFile(answers) {
    return `
    #${answers.Title}
    ${answers.Description}`;
}

// function to initialize program
askQuestions()
    .then(function (answers) {
        const readMe = writeToFile(answers);

        return writeToFileAsync("README.md", readMe)
    })
    .then(function () {
        console.log("Your README is done.")
    })
    .catch(function (err) {
        console.log(err);
    });

// function call to initialize program

