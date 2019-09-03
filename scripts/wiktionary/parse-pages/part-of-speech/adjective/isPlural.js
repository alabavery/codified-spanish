import {getFormOfText} from "./common";

// example1: 'form of|americano|m|pl' => 'pl'
// example2: 'form of|americano|pl|m' => 'pl'
export default function (adjectiveText) {
    if (adjectiveText.indexOf('g=m-p') >= 0) {
        return true;
    }
    if (adjectiveText.indexOf('g=f-p') >= 0) {
        return true;
    }
    const formOfText = getFormOfText(adjectiveText);
    if (!formOfText) {
        return false;
    }
    const foundPlBeforeEnd = formOfText.indexOf('|pl|') >= 0;
    if (foundPlBeforeEnd) {
        return true;
    }
    return !!(/pl$/.exec(formOfText));
}