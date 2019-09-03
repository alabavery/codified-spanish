import fs from 'fs';
import getSpanishPart from './divisors/get-spanish-part';
import getTextByPartofSpeech from './divisors/get-by-part-of-speech';
import {getPartsOfSpeechValues} from "./parts-of-speech-constants";
import extractNoun from './part-of-speech/noun';
import extractAdjective from './part-of-speech/adjective';
import extractVerb from './part-of-speech/verb';
import getMeanings from './meanings';

export default async function (word, pagePath, partsOfSpeechToParse, options = {}) {
    const fileContents = await fs.readFileSync(pagePath, 'utf8');
    return parsePageText(word, fileContents, partsOfSpeechToParse, options);
}

export async function parsePageText(wordString, pageText, partsOfSpeechToParse, options) {
    let spanishPart;
    try {
        spanishPart = getSpanishPart(pageText);
    } catch (e) {
        throw new Error(`Problem getting Spanish part of page: ${e.message}`);
    }
    let byPartOfSpeech;
    try {
        byPartOfSpeech = getTextByPartofSpeech(spanishPart, partsOfSpeechToParse);
    } catch (e) {
        throw new Error(`Problem dividing by part of speech: ${e.message}`);
    }
    const allDataForPage = [];
    for (let i = 0; i < Object.keys(byPartOfSpeech).length; i += 1) {
        const partOfSpeech = Object.keys(byPartOfSpeech)[i];
        const partOfSpeechEntry = { string: wordString, partOfSpeech, words: [] };
        try {
            partOfSpeechEntry.words = await getWordsForSinglePartOfSpeech(
                wordString,
                partOfSpeech,
                byPartOfSpeech[partOfSpeech],
                options,
            );
        } catch (e) {
            partOfSpeechEntry.error = e.message;
        }
        allDataForPage.push(partOfSpeechEntry);
    }
    return allDataForPage;
}

/**
 * Should return:
 *  [
 [
 { dataType: 'number', value: '1' },
 { dataType: 'gender', error: 'Could not parse gender: preceder pattern not found'  }
 ],

 ]
 *
 */
async function getWordsForSinglePartOfSpeech(wordString, partOfSpeech, textForPartOfSpeech, options) {
    switch (partOfSpeech) {
        case getPartsOfSpeechValues(['verb'])[0]: {
            return extractVerb(wordString, textForPartOfSpeech);
        }
        case getPartsOfSpeechValues(['noun'])[0]: {
            return extractNoun(wordString, textForPartOfSpeech);
        }
        case getPartsOfSpeechValues(['adjective'])[0]: {
            return extractAdjective(wordString, textForPartOfSpeech);
        }
        default: {
            return [[
                {dataType: 'meanings', value: getMeanings(wordString, textForPartOfSpeech)},
                {dataType: 'lemma', value: wordString },
            ]];
        }
    }
}

