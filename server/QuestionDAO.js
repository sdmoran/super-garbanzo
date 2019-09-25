const readline = require('readline');
const fs = require('fs');
const permissions = require('./permissions')

var mysql      = require('mysql');
// Decent security practices I think
var connection = mysql.createConnection({
  host     : permissions.database.host,
  user     : permissions.database.user,
  password : permissions.database.password,
  database : permissions.database.database
});
 
connection.connect();

function randomQuestions(num=1) {
    const q = "SELECT * FROM questions ORDER BY RAND() LIMIT ?";
    return new Promise((resolve, reject) => {
        connection.query(q, num, function(err, rows) {
            connection.end();
            if(!err) {
                resolve(rows);
            }
            else {
                reject(err);
            }
        })
    })
}

// Useful for loading questions into the server, if you have some prepared in a file.
function loadQuestions() {
    // Create linereader on questions file
    let rl = readline.createInterface({
        input: fs.createReadStream('questions.txt')
    })

    // SQL query to execute
    var sql = "INSERT INTO questions (questionid, questiontext) VALUES ?";

    // Iterate through file and add each question to database
    let questionid = 0;
    let values = [];

    // Read through lines of file and insert them into array
    rl.on('line', function(line) {
        if(line.includes('Question')) {
            questionid++;
            questiontext = line.split('Question: ')[1];
            values.push([questionid, questiontext]);
        }
    });

    // When file closes, insert all questions read from file into the database.
    rl.on('close', function(line) {
        console.log('Total questions added: ' + questionid);
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });
    })
}

exports.randomQuestions = randomQuestions;