# Welcome to FT-server-Side-Rendering

![FT](https://www.samanthaettus.com/wp-content/uploads/2014/08/ft-logo.png)

The FT server application is for achieve world news headlines that client can access the news that contains the keyword by searching for a specific keyword. like the Brexit, so the application shows all the news about Brexit.
Also the application has pagination which has the ability to categorize the pages into a specific number that client select.

App Name : FT API news 
Customer : Financial Times 
Development Team : Meisam E Zarghani (Backend , frontend developer : 24 Apr 2021 - till date) 
Date : 30 Apr 2021
Server URL : [https://ft-server-side-meisam.herokuapp.com/]

## About this file
The purpose of this file is to provide overview, setup instructions and background information of the project. If you have joined this project as a part of the development team, please ensure this file is up to date.

Note : Any dependencies added / modified to this project which affect the running of the code in this git repository must be listed in this file. All developers must ensure that the instructions mentioned in this file are sufficient to enable a new developer to obtain a executable copy of the latest code in this repository, without involvement from any other human assistance.

I) language requirements :
   1) NodeJS
   4) CSS
   II) Tools
   1) VScode
   2) Postman
   3) heroku
   4) GitHub

## Project Technical Specifications
* This project is a server based project which uses NodeJS for the backend side and uses specific API from Financial Times.
* Express Handlebars for send the final data to the client side also use that Handlebars for Pagination.
* The code is store on Github Repository and the server application is running on Heroku.
* The design for reference is from FT.com website.
* The application can work without the javaScript language on you browser.

## library used
   1) Express
   2) Handlebars
   3) Helper
   4) node-fetch
   5) routes
   6) body-parser
   7) Pagination

## Setup Instructions
As mentioned earlier , this is a NodeJS project, The below mentioned steps may vary significantly across various operating systems, please follow them accordingly.
These instructions are aimed at a developer who has been added to the project team, after the project development has already been initiated, Therefore the aim is to get the code from the git repository to run on the developer's system, so as to allow him / her to continue with further development.

### Clone the repository from GitLab :
gh repo clone Erwin6997/FT_Server-Side-Rendering

### Change current working directory to Project directory
cd FT_Server-Side-Rendering

### Checking out the latest development branch
As of writing this guide the main branch used for development is : develop
To switch to this branch : git checkout develop

## Installing dependencies
TThis project requires NodeJS for running, You can install it by referring to the official NodeJS page : [https://nodejs.org/en/] 
The NodeJS version used at the time of writing this file is : v14.16.1 You can check the installed version using Node -v The package.json file contains the list of all npm plugins and libraries used for this project. 
Please ensure this file is updated incase any plugin is added / removed. 
Please follow below steps for installation : 
Install NodeJS and Dependencies 
### npm install 
Next reload the package.json 
### npm init

## .evn
The .evn file has variables which the server need that to run such as PORT, Key, URL.
## Start the server :
nodemon server.js
(If you get error about Access to this API has been disallowed means you Token Key which you need for get access to the FT API is expired )
