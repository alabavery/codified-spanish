import * as graphQL from "graphql";
import LemmaService from "../../../services/lemma";

export const fields = {
    id: {type: graphQL.GraphQLID},
    string: {type: graphQL.GraphQLString},
    partOfSpeech: {type: graphQL.GraphQLString},
    tense: {type: graphQL.GraphQLString},
    lemmaId: {type: graphQL.GraphQLID},
    lemma: {
        type: new graphQL.GraphQLObjectType({
            name: 'lemma',
            fields: {
                id: {type: graphQL.GraphQLID},
                string: {type: graphQL.GraphQLString},
                partOfSpeech: {type: graphQL.GraphQLString},
                meanings: { type: graphQL.GraphQLList(graphQL.GraphQLString) },
            },
        }),
        // todo this should be SQL joined instead of manually fetched
        // with the resolver.  That way, can fetch all the lemmas in
        // one SQL call as the words are fetched instead of each one
        // individually after the words are fetched
        resolve: async function (word) {
            if (word && word.dataValues) {
                return LemmaService.findById(word.dataValues.lemmaId);
            }
            return {}
        }
    },
};

export default new graphQL.GraphQLObjectType({
    name: 'word',
    fields,
});

