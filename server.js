const app = require('./app');

let port = process.env.PORT;

app.listen(port, () => console.log(`App listening on port ${port}!`));