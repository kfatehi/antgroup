var express = require('express');
var cors = require('cors');
var body_parser = require('body-parser');

var app = express();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.listen(9999, function () {
    console.log('Server is listenion on 9999');
});

app.get('/nodes', function(req, res){
	res.status(200);
    res.json([
		{
            _id: 1,
            attrs: {
                id: 'cs33',
                name: 'Super Computer Science'
            },
            requirements: 'someid'
		},
		{
            _id: 3,
            attrs: {
                id: 'cs3',
                name: 'Introduction to Computer Science'
            },
            requirements: 'someid'
		},
		{
            _id: 5,
            attrs: {
                id: 'cs50',
                name: 'C Programming',
            },
            requirements: 'someid'
		}
	]);
});

app.delete('/nodes/:id', function (req, res) {
    res.sendStatus(204);
});