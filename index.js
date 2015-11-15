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
	var newrows =[];
	var newfields = [];
	var i;
	console.log("Second: " + request.params.zip);
	var zip = request.params.zip;
	//response.redirect('pages/calendar-home');
	//response.render('pages/calendar');
	


	//SELECT c.*, e.* FROM FoodSNAP.events e join FoodSNAP.company_users c on e.branch_id = c.branch_id where c.zip = '30071'
	connection.query("SELECT c.company_name, c.address, c.city, c.state, c.phone, e.* FROM FoodSNAP.events e JOIN FoodSNAP.company_users c ON e.branch_id = c.branch_id WHERE c.zip = '" + zip + "'" , function(err, rows){
		if(err) throw err;
		//connection.end();
		response.render('pages/calendar', {r:rows});
		
	});

	
});


app.get('/company-login', function(request,response){
	console.log("This is company login");
	response.render('pages/company-login');
});

app.get('/volunteer-login', function(request,response){
	console.log("This is volunteer login");
	response.render('pages/volunteer-login');
});

/*app.get('/company-signup', function(request,response){
	console.log("This is company signup");
	response.render('pages/company-signup');
});*/

app.get('/volunteer-signup', function(request,response){
	console.log("This is volunteer signup");
	response.render('pages/volunteer-signup');
});

app.get('/company-signup', function(request, response) {
	response.render('pages/company-signup');
	console.log("Company sign-up request submit");
	console.log(request.body.CompanyName);
	
	var company_name = request.body.CompanyName;
	var addr = request.body.CompanyAddress;
	var city = request.body.CompanyAddressCity;
	var state = request.body.CompanyAddressState;
	var zip = request.body.CompanyAddressZip;
	var manager_first = request.body.CompanyManagerFirst;
	var manager_last = request.body.CompanyManagerLast;
	var phone = request.body.CompanyManagerPhone;
	var user = request.body.Username;
	/*var pass = request.body.Password;
	var confirm_pass = request.body.ConfirmPassword;*/
	
	var vegetarian = request.body.specialFoodsVegetarian;
	var vegan = request.body.specialFoodsVegan;
	var kosher = request.body.specialFoodsKosher;
	var halal = request.body.specialFoodsHalal;
	
	var volunteer = request.body.optradio;
	
	console.log(company_name);
	
	connection.query("SELECT max(branch_id) FROM FoodSNAP.company_users", function(err, branch_id){
		if(err) throw err;
		connection.query("INSERT INTO company_users VALUES (" + branch_id+1 + ", " + manager_first + ", " + manager_last + ", " + addr + ", " + city + ", " + state + ", " + zip + ", " + phone + ", " + volunteer + ", " + vegetarian + ", " + vegan + ", " + kosher + ", " + halal + ", " + company_name + ", " + user + /*", " + pass + */")", function(err1){
			if(err1) throw err1;
			//connection.end();		
		});
	});
	

});