const express = require('express');
const graphqlHTTP = require('express-graphql');
import schema from './schema';
const app = express();

app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(process.env.PORT || 4000, () => {
    console.log('Listening...')
});