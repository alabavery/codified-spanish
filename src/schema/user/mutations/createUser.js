import * as graphQL from 'graphql';
import UserService from '../../../services/user';

const userType = new graphQL.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphQL.GraphQLID },
        name: { type: graphQL.GraphQLString },
    },
});

export default {
    type: userType,
    args: { name: { type: graphQL.GraphQLString } },
    resolve,
}

async function resolve(_, args) {
    return UserService.createOne(args);
}