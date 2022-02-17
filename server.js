const express = require('express');
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet({
	contentSecurityPolicy: false,
}));
app.use(express.static(__dirname + '/dist'));

app.use('/*', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
