var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'foodsnap.c7tcssw8uobt.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'foodsnap',
	password: 'foodsnap',
	database: 'FoodSNAP'
});
var app = express();
var cal = express();

connection.connect(function(err){
	if(!err){
		console.log("Database if connected :D \n\n");
	}else{
		console.log("Error connecting database D: \n\n");
	}
	
});

connection.query('SELECT 1+1 AS solution FROM company_users', function(err, rows, fields){
if(err) throw err;
console.log('The solution is: ', rows[0].solution);
});

connection.end();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//get calendar
app.get('/calendar', function(request,response){
	console.log(request.formGroupZipcodeInput);
	request.send(request);
	//response.redirect('pages/calendar-home');
	response.render('pages/calendar');
});

//get calendar
app.get('/calendar/:zip', function(request,response){
	console.log("Second: " + request.params.zip);
	//response.redirect('pages/calendar-home');
	response.render('pages/calendar');
});



