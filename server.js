const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const fetch = require('node-fetch');
const Handlebars = require('handlebars');
const paginateHelper = require('express-handlebars-paginate');
const dotenv = require('dotenv');
const { helpers } = require('handlebars');
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

//.evn Variables :
const PORT = process.env.PORT;
const URL = process.env.FT_URL;
const FTKey = process.env.FT_KEY;
const FTContentType = process.env.CONTENT_TYPE;
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
    if (dataFetch.results[0].indexCount == 0) {
        const message = `No results found for ${dataFetch.query.queryString} `;
        res.render('home', {message})
        }else {
            const paginationData = await pagination(dataFetch , page)
            const finalResults = paginationData.results;
            const finalPages = paginationData.pages;
            res.render('home', {finalResults , finalPages , key})
        }
        } catch(error) {console.log(error)}
});

async function pagination(dataFetch , page) {
    if (!page){
        page = 1;
    }
    const limit = 10; // this is the limit of the news on one page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    if (page == 1){
        results.pages = {
            prevPage : null ,
            currentPage : page ,
            nextPage : dataFetch.query.resultContext.maxResults / limit > 1 ? 2 : null,
        }
    } else  if (page > 1){
        results.pages = {
            prevPage : page - 1 ,
            currentPage : page ,
            nextPage : dataFetch.query.resultContext.maxResults / limit > page ? page + 1 : null ,
        }
    } 
        const newFetch = dataFetch.results[0].results
        results.results = newFetch.slice(startIndex, endIndex);
        return results
}

// fetch function
async function fetchAPI() {
    const respond = await fetch(URL , {
			method: 'POST',
			body: JSON.stringify(bodySend),
			headers: {
				'Content-Type': FTContentType,
				'X-Api-Key': FTKey
			    }
		})
            return respond.json()
}
// end fetch

app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
});
