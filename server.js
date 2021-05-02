const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;



app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        getShortComment(comment) {
            if (comment.length < 64) {
                return comment;
            }

            return comment.substring(0, 61) + '...';
        }
    }
}));

app.set('view engine', 'hbs');
const posts = [
            {
                author: 'Meisam',
                image: 'https://picsum.photos/500/500',
                comments: [
                    'This is the first comment',
                    'This is the second comment',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
                ]
            },
            {
                author: 'John Doe',
                image: 'https://picsum.photos/500/500?2',
                comments: ['This is the second comment',
                    'Lorem ipsum dolor sit amet'
                ]
            }
        ];
app.get('/', function (req, res) {
    res.render('home', {posts});
});

app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
});
