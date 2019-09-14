import * as graphQL from 'graphql';
import WordService from '../../../services/word';
import wordType, { fields } from '../types/wordType';

// each argument will be a GraphQLList of the field type
const args = Object.keys(fields).reduce(
    (acc, fieldName) => {
        if (fieldName !== 'lemma') {
            acc[fieldName] = { type: graphQL.GraphQLList(fields[fieldName].type) };
        } else {
            // for the lemma, they should query
            acc[fieldName] = { type: graphQL.GraphQLList(graphQL.GraphQLString) };
        }
        return acc;
    },
    {},
);

export default {
    type: graphQL.GraphQLList(wordType),
    args,
    resolve: async function (_, args) {
        return WordService.findAll(await resolveArgs(args));
    },
};

async function resolveArgs(args) {
    const resolved = Object.keys(args).reduce((acc, key) => {
        if (key !== 'lemma') {
            acc[key] = args[key];
        }
        return acc;
    }, {});
    if (args.lemma) {
        resolved.lemmaId = await WordService.getLemmaIds(args.lemma);
    }
    return resolved;
}