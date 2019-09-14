import * as graphQL from 'graphql';
import UserService from '../../../services/user';

const user = new graphQL.GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: graphQL.GraphQLString },
        name: { type: graphQL.GraphQLString },
    },
});

export default {
    type: user,
    args: { id: { type: graphQL.GraphQLID }},
    resolve: async function (_, args) {
        return UserService.findById(args.id);
    },
};
