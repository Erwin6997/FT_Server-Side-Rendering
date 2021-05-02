const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use(express.static('views'));
app.set('view engine', 'hbs');

const bodySend = {
	queryString: '',
	resultContext: {
		aspects: [ 'title', 'lifecycle', 'location', 'summary', 'editorial' ]
	}
};
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        timeDate(dateTime) {
            if (dateTime) {
                    var date = dateTime.split("T")[0];
                     var time = dateTime
                     .split("T")[1]
                     .split(".")[0]
                     .split(":")
                     .slice(0, 2)
                     .join(":");
            }
            return date +" "+ time;
        }
    }
}));



var posts = []



app.get('/',fetchAPI(), (req, res) => {
    res.render('home', {posts});
});



// fetch function
function fetchAPI() {
    return (req, res, next) => {
		fetch(`https://api.ft.com/content/search/v1`, {
			method: 'POST',
			body: JSON.stringify(bodySend),
			headers: {
				'Content-Type': 'application/json',
				'X-Api-Key': '59cbaf20e3e06d3565778e7b9758f7892e89468293a48663b98bd1d9'
			}
		})
			.then((res) => res.json())
			.then((data) => {
			posts = data.results[0].results;
            next();
			});
	};
}
// end fetch


app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
});
