const express = require('express');
const graphqlHTTP = require('express-graphql');
import schema from './schema';
const app = express();
// you must explicitly import process in any file you use it in
// order for heroku to use it correctly.
const process = require('process');

app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port} ...`)
});