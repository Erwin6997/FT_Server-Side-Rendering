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
                console.log(dateTime , "hhhhhh")
                    var date = dateTime.split("T")[0];
                     var time = dateTime
                     .split("T")[1]
                     .split(".")[0]
                     .split(":")
                     .slice(0, 2)
                     .join(":");
            }
            return date +"                 "+ time;
        }
    }
}));



const posts = [
                {
                    "aspectSet": "article",
                    "modelVersion": "1",
                    "id": "e59496a6-a844-425c-85ed-98341a26093e",
                    "apiUrl": "https://api.ft.com/content/e59496a6-a844-425c-85ed-98341a26093e",
                    "title": {
                        "title": "El Salvador’s president seizes control of top court with firing of judges"
                    },
                    "lifecycle": {
                        "initialPublishDateTime": "2021-05-02T15:22:37Z",
                        "lastPublishDateTime": "2021-05-02T17:41:49Z"
                    },
                    "location": {
                        "uri": "https://www.ft.com/content/e59496a6-a844-425c-85ed-98341a26093e"
                    },
                    "summary": {
                        "excerpt": "El Salvador’s authoritarian president Nayib Bukele has moved to consolidate his grip on power following a landslide win..."
                    },
                    "editorial": {
                        "subheading": "Ousting of supreme court justices and attorney-general raises democracy fears ",
                        "byline": "Jude Webber"
                    }
                },
                {
                    "aspectSet": "article",
                    "modelVersion": "1",
                    "id": "7a083a4e-8f29-4f0c-9277-b8bcf8c48ccf",
                    "apiUrl": "https://api.ft.com/content/7a083a4e-8f29-4f0c-9277-b8bcf8c48ccf",
                    "title": {
                        "title": "Manchester Utd fans protest against Glazers after Super League collapse"
                    },
                    "lifecycle": {
                        "initialPublishDateTime": "2021-05-02T16:17:02Z",
                        "lastPublishDateTime": "2021-05-02T17:09:05Z"
                    },
                    "location": {
                        "uri": "https://www.ft.com/content/7a083a4e-8f29-4f0c-9277-b8bcf8c48ccf"
                    },
                    "summary": {
                        "excerpt": "Manchester United fans stormed into the English football club’s stadium and on to the pitch on Sunday to protest against..."
                    },
                    "editorial": {
                        "subheading": "Match against Liverpool called off after Old Trafford pitch demonstration against US owners",
                        "byline": "Samuel Agini"
                    }
                },
                {
                    "aspectSet": "article",
                    "modelVersion": "1",
                    "id": "cbd82f08-edad-4822-82fa-f4ae3416467f",
                    "apiUrl": "https://api.ft.com/content/cbd82f08-edad-4822-82fa-f4ae3416467f",
                    "title": {
                        "title": "India’s ruling BJP suffers setback in state elections"
                    },
                    "lifecycle": {
                        "initialPublishDateTime": "2021-05-02T16:38:34Z",
                        "lastPublishDateTime": "2021-05-02T16:38:34Z"
                    },
                    "location": {
                        "uri": "https://www.ft.com/content/cbd82f08-edad-4822-82fa-f4ae3416467f"
                    },
                    "summary": {
                        "excerpt": "India’s prime minister Narendra Modi suffered a significant political setback on Sunday when his Bharatiya Janata party..."
                    },
                    "editorial": {
                        "subheading": "Failure in West Bengal despite aggressive campaign delivers blow to Modi’s leadership in midst of pandemic",
                        "byline": "Amy Kazmin in New Delhi"
                    }
                }
]



app.get('/', (req, res) => {
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
			});
	};
}
// end fetch





app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
});
