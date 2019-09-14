import * as graphQL from 'graphql';
import WordSchemas from './word';
import UserSchemas from './user';
import UserKnowledgeSchemas from './userKnowledge';

const queryFields = {
    ...WordSchemas.queries,
    ...UserSchemas.queries,
    ...UserKnowledgeSchemas.queries,
};

const mutationFields = {
    ...WordSchemas.mutations,
    ...UserSchemas.mutations,
    ...UserKnowledgeSchemas.mutations,
};

export default new graphQL.GraphQLSchema({
    ...(Object.keys(queryFields).length ? {
        query: new graphQL.GraphQLObjectType({
            name: 'RootQueryType',
            fields: queryFields,
        }),
    } : {}),
    ...(Object.keys(mutationFields).length ? {
        mutation: new graphQL.GraphQLObjectType({
            name: 'RootMutationType',
            fields: mutationFields,
        }),
    } : {}),
});