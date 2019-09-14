import BaseService from "./base";
import {Word} from "../models";
import LemmaService from './lemma';

class WordService extends BaseService {
    async getLemmaIds(lemmaStrings) {
        return (await LemmaService.findAll({string: lemmaStrings})).map(lemma => lemma.id);
    }

    async getWordsOfGivenLemmaAndProperties(lemmaId, properties) {
        const nonNilProperties = Object
            .keys(properties)
            .reduce(
                (acc, propName) => {
                    if (properties[propName] || properties[propName] === 0) {
                        acc[propName] = properties[propName];
                    }
                    return acc;
                },
                {},
            );
        nonNilProperties.lemmaId = lemmaId;
        return this.findAll(nonNilProperties);
    }
}

export default new WordService(Word);