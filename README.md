----------  To-do List Web App ----------------

## Description-
Welcome. Register and Login with Session Authentication and users can create their own to-do list and delete it.

## Technology I used
React js + Express + MYSQL + Node JS + Bootstrap

## Running The App Locally -
1. Make sure you have an up-to date version of MYSQL and MYSQL Workbench (Or PHPMyAdmin) installed on your system.
2. download and unzip folder
3. Make sure you have installed server dependencies
  `npm install` 

4. In the root directory open terminal tab and run "cd server" to go into the server directory.
5. Start the server by running the command "node index"
6. open another terminal tab and run "cd client" to change into the client directory
7. While in the client, "npm start" to completely start the application.
localhost:3000

8. To connect node js with mysql dabatase replace the value with yours. navigate the lines in server directory in 'index.js'
* 26] user: 'root' // place yours username
* 27] password: 'root1234' // place yours password
* after run the query please uncomment the database option or it will give error.
* And then uncomment table line no 44 to 61 to create the table.