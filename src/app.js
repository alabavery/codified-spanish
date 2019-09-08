const express = require('express');
const graphqlHTTP = require('express-graphql');
import schema from './schema';
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(process.env.PORT, () => {
    console.log('Listening...')
});