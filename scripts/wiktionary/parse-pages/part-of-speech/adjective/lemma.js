// in this excerpt from the page of 'locos' in spanish, which is the plural
// of loco, we should return loco:
// '{{es-adj form of|loco|m|pl}}'
// if returns null, should assume this string/word is itself the lemma
import {getFormOfText} from "./common";

export default function (adjectiveText) {
    const formOfText = getFormOfText(adjectiveText);
    if (!formOfText) {
        // if the adjective is the lemma, return null
        return null;
    }
    const endOfLemma = formOfText.indexOf('|');
    if (endOfLemma < 0) {
        throw new Error(`No end delimiter found when searching for lemma`);
    }
    return formOfText.slice(0, endOfLemma);
}