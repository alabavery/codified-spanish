import uuid from 'uuid/v4';
import {getJsonDataFromFile, saveDataAsJson} from "../../utils/file-io-utils";
import { getParamsFromCommandLine } from "../../utils/command-line-utils";

if (require.main === module) {
    const { args } = getParamsFromCommandLine();
    flatten(args[0], args[1]).then(() => console.log('Done!'));
}


const getDataObject = (key, data, error) => ({dataType: key, value: data === undefined ? null : data, error: error || null});
const getId = () => getDataObject('id', uuid());
const getWordString = (wordString, error) => getDataObject('string', wordString, error);
const getLemma = lemma => getDataObject('lemma', lemma);
const getTense = tense => getDataObject('tense', tense);
const getPerson = person => getDataObject('person', person);
const getIsLemma = bool => getDataObject('isLemma', bool);
const getPartOfSpeech = () => getDataObject('partOfSpeech', 'verb');

// A single entry in unflattened looks like:
// {
//     infinitive: 'infinitiveString',
//     meanings: {
//          data: ['meaning1', 'meaning2'],
//          error: 'any error',
//     }
//     conjugations: [
//          {
//              person: 1,
//              tense: 'tenseOfConjugation1',
//              data: 'stringForConjugation1',
//              error: 'errorForConjugation1',
//          },
//          {
//              person: 2,
//              tense: 'tenseOfConjugation2',
//              data: 'stringForConjugation2',
//              error: 'errorForConjugation2',
//          },
//     ],
// }
// We want to transform it to:
// [
//      # entry for conjugation1
//      [
//          { dataType: 'id', data: uuid },
//          { dataType: 'wordString', data: 'stringForConjugation1', error: 'errorForConjugation1' },
//          { dataType: 'lemma', data: 'uuid for infinitive' },
//          { dataType: 'meanings', data: ['meaning1', 'meaning2'], error: 'any error' },
//          { dataType: 'tense', data: 'tenseOfConjugation1' },
//          { dataType: 'person', data: 1 },
//      ],
//      # entry for conjugation2
//      [
//          { dataType: 'id', data: uuid },
//          { dataType: 'string', data: 'stringForConjugation2', error: 'errorForConjugation2' },
//          { dataType: 'lemma', data: infinitive' },
//          { dataType: 'meanings', data: ['meaning1', 'meaning2'], error: 'any error' },
//          { dataType: 'tense', data: 'tenseOfConjugation2' },
//          { dataType: 'person', data: 2 },
//      ],
//      # entry for infinitive
//      [
//          { dataType: 'id', data: uuid },
//          { dataType: 'string', data: 'infinitiveString' },
//          { dataType: 'lemma', data: null },
//          { dataType: 'meanings', data: ['meaning1', 'meaning2'], error: 'any error' },
//          { dataType: 'tense', data: 'infinitive' },
//          { dataType: 'person', data: 'infinitive' },
//      ],
// ]
async function flatten(filePath, targetPath) {
    const unflattened = await getJsonDataFromFile(filePath);
    await saveDataAsJson(getFlat(unflattened), targetPath);
}

export function getFlat(unflattened) {
    return unflattened.reduce((allWords, unflattenedEntry) => {
        const meanings = getDataObject(
            'meanings',
            unflattenedEntry.meanings.data,
            unflattenedEntry.meanings.error,
        );

        // add an entry for the infinitive
        allWords.push([
            getId(),
            getWordString(unflattenedEntry.infinitive),
            getLemma(null),
            meanings,
            getTense(null),
            getPerson(null),
            getIsLemma(true),
            getPartOfSpeech(),
        ]);

        for (let i = 0; i < unflattenedEntry.conjugations.length; i += 1) {
            let person;
            if (unflattenedEntry.conjugations[i].person === 0) {
                person = 0;
            } else {
                person = unflattenedEntry.conjugations[i].person || null;
            }

            allWords.push([
                getId(),
                getWordString(
                    unflattenedEntry.conjugations[i].data,
                    unflattenedEntry.conjugations[i].error,
                ),
                getLemma(unflattenedEntry.infinitive),
                meanings,
                getTense(unflattenedEntry.conjugations[i].tense || null),
                getPerson(person),
                getIsLemma(false),
                getPartOfSpeech(),
            ]);
        }
        return allWords;
    }, []);
}
