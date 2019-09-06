import * as graphQL from 'graphql';
import WordSchema from './word';

export default new graphQL.GraphQLSchema({
    query: new graphQL.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            word: WordSchema,
        },
    }),
});