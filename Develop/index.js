const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")

const writeToFileAsync = util.promisify(fs.writeFile)
// array of questions for user

const askQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What do you want you title to be?"
        },
        {
            type: "input",
            name: "description",
            message: "What do you want you description to be?"
        },
        {
            type: "confirm",
            name: "tableOfContents",
            message: "Do you want a table of contents? Will include installation, usage, contributing, license and, tests."
        },
        {
            type: "input",
            name: "installation",
            message: "How do you instal it?"
        },
        {
            type: "input",
            name: "usage",
            message: "How do you use it?"
        },
        {
            type: "input",
            name: "license",
            message: "What can other develipers can and can't do with you project?"
        },
        {
            type: "input",
            name: "contributing",
            message: "How can other develipers contribut to the pregect?"
        },
        {
            type: "input",
            name: "tests",
            message: "How do you test if it works?"
        },
    ])
}
// function to write README file
function writeToFile(answers) {
    return `
    #${answers.title}
    
    ##Description

    ${answers.description}
    
    ##Table of Contents
    
    * [Installation] ## Installation
    * [Usage] ## Usage
    * [License] ## License
    * [Contributing] ## Contributing
    * [Tests] ## Tests

    ## Installation

    ${answers.installation}
    
    ## Usage

    ${answers.usage}
    
    ## License
    
    ${answers.license}

    ## Contributing

    ${answers.contributing}
    
    ## Tests

    ${answers.tests}`
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