import * as graphQL from 'graphql';
import resolve from './resolve';

const fields = {
    id: { type: graphQL.GraphQLList(graphQL.GraphQLID) },
    string: { type: graphQL.GraphQLList(graphQL.GraphQLID) },
    partOfSpeech: { type: graphQL.GraphQLString },
    lemmaId: { type: graphQL.GraphQLID },
};

const word = new graphQL.GraphQLObjectType({
    name: 'word',
    fields,
});

export default {
    type: graphQL.GraphQLList(word),
    args:  fields,
    resolve,
};
