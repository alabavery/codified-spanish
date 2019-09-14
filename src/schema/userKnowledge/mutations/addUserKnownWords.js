import * as graphQL from 'graphql';
import UserWordService from '../../../services/userWord';
import WordService from '../../../services/word';
import userKnownWordType from '../types/userKnownWord';

export default {
    type: graphQL.GraphQLList(userKnownWordType),
    args: {
        userId: { type: graphQL.GraphQLString },
        wordIds: { type: graphQL.GraphQLList(graphQL.GraphQLID) },
        lemmaId: { type: graphQL.GraphQLID },
        tense: { type: graphQL.GraphQLString },
        person: { type: graphQL.GraphQLInt },
    },
    resolve,
}

async function resolve(_, args) {
    if (!args.userId) {
        // todo, is there no way to require fields through GraphQL???
        throw new Error(`userId is required!`);
    }
    if (args.lemmaId) {
        args.wordIds = (await WordService.getWordsOfGivenLemmaAndProperties(
            args.lemmaId,
            { tense: args.tense, person: args.person },
        )).map(word => word.id);
    }
    if (!args.wordIds || !args.wordIds.length) {
        return [];
    }
    return UserWordService.createMany(
        args.wordIds.map(wordId => ({ wordId, userId: args.userId })),
    );
}