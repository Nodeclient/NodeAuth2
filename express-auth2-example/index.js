
const ejs = require('ejs');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
	app.use( bodyParser.json() );
		app.use(bodyParser.urlencoded({
			extended: true
	})); 

	//TIME SERVICE
	const ns = require('daytime-service').default
	const daytime = new ns.DayTime("NA2");
	//http://yourhost/api/daytime
	app.get('/api/daytime', (req, res) => res.send( daytime.GetTime ))

	// NODE-AUTH-2
	process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32)
	process.env.TOKEN_PREFIX = "-"; // Custom token prefix (-) (*) (🔑)
	const na2 = require("nodeauth2"); // Import NA2 Module
	const NodeAuth2 = new na2.default.Authentication(20); // Token Expiration Time 20 sec
	NodeAuth2.http = "http://127.0.0.1:3000/api/daytime"
	
	//LOGIN.EJS
	app.get("/login", function(req,res) {
		res.render('./pages/login.ejs')
	})
	
	/* DATABASE SIMULATION */
		let DB = { mail:"test@example.com",secret:"this is your secret pass phrase" }

	//CHECK TOKEN
	app.post('/one-time-check', function(req, res) {
		var user_id = req.body["inputEmail"] ;
		var token = req.body["inputToken"] ;
			if(user_id == DB.mail){

				NodeAuth2.AuthCheck(DB.secret,token).then( t =>{
					console.log(t , DB.secret);
						//PAGE.EJS
						res.render('./pages/page.ejs', { user: user_id , data: t } );
				});

			} else{
				//ERROR RETURN
				res.send( "User not Found : " + user_id )
			}
	});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
