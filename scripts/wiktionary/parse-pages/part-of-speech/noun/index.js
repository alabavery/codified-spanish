import {getWordForNounOrAdjective} from "../common";
import lemmaGetter from './lemma';
import genderGetter from './gender';
import isPluralGetter from './isPlural';
import meaningsGetter from '../../meanings';

export default function (wordString, nounText) {
    return [
        getWordForNounOrAdjective(
            wordString,
            nounText,
            {
                lemma: (_, text) => lemmaGetter(text),
                gender: (_, text) => genderGetter(text),
                isPlural: (_, text) => isPluralGetter(text),
                meanings: meaningsGetter,
            },
        ),
    ];
}