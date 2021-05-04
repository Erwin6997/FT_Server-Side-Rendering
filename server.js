const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const Handlebars = require('handlebars');
const paginateHelper = require('express-handlebars-paginate');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
//Handlebars.registerHelper('paginate', paginate);
// Handlebars settings
app.set('view engine', 'hbs');
const limit = 10;
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        timeDate : (PublishDateTime) => {    /// separate Date and Time 
            var date = PublishDateTime.split("T")[0];
             var time = PublishDateTime
             .split("T")[1]
             .split(".")[0]
             .split(":")
             .slice(0, 2)
             .join(":");
             return date +" "+ time;
        },
    }
}));
///end 

const bodySend = {
	queryString: '',
	resultContext: {
		aspects: [ 'title', 'lifecycle', 'location', 'summary', 'editorial' ]
	}
};

app.get('/', async (req, res) => {
    try {
        const key = req.query.key;
        const page = parseInt(req.query.page);
        bodySend.queryString = key;
        const dataFetch = await fetchAPI()
        const paginationData = await pagination(dataFetch , page)
        const finalResults = paginationData.results;
        const finalPages = paginationData.pages;
        res.render('home', {finalResults , finalPages , key})
        } catch(error) {console.log(error)}
});

async function pagination(dataFetch , page) {
    if (!page){
        page = 1;
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    if (page == 1){
        results.pages = {
            prevPage : null ,
            currentPage : page ,
            nextPage : dataFetch.results[0].maxResults / limit > 1 ? 2 : null,
            class : "deactive"
        }
    } else  if (page > 1){
        results.pages = {
            prevPage : page - 1 ,
            currentPage : page ,
            nextPage : dataFetch.results[0].maxResults / limit > page ? page + 1 : null,
             class : "deactive"
        }
    } 
    console.log(results.pages.nextPage ,"next")
        const newFetch = dataFetch.results[0].results
        results.results = newFetch.slice(startIndex, endIndex);
        return results
}

// fetch function
async function fetchAPI() {
    const respond = await fetch(`https://api.ft.com/content/search/v1`, {
			method: 'POST',
			body: JSON.stringify(bodySend),
			headers: {
				'Content-Type': 'application/json',
				'X-Api-Key': '59cbaf20e3e06d3565778e7b9758f7892e89468293a48663b98bd1d9'
			    }
		})
            return respond.json()
}

// end fetch



app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
});
