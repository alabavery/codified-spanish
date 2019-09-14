import * as graphQL from "graphql";

export default new graphQL.GraphQLObjectType({
    name: 'UserKnownWord',
    fields: {
        id: { type: graphQL.GraphQLID },
        wordId: { type: graphQL.GraphQLID },
        userId: { type: graphQL.GraphQLID },
    },
});