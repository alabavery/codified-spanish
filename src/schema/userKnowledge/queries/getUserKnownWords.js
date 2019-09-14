import * as graphQL from 'graphql';
import wordType from '../../word/types/wordType';
import userWordService from '../../../services/userWord';
import wordService from '../../../services/word';

export default {
    type: graphQL.GraphQLList(wordType),
    args: {
      userId: { type: graphQL.GraphQLID }  ,
    },
    resolve: async function (_, args) {
        const userWords = await userWordService.findAll({ userId: args.userId })
        if (!userWords.length) {
            return [];
        }
        return wordService.findByIds(userWords.map(uw => uw.wordId));
    }
}