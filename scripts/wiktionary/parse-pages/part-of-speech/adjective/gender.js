import {getFormOfText} from "./common";

export default function (adjectiveText) {
    const formOfText = getFormOfText(adjectiveText);
    return formOfText
        ? getGenderForFormOf(formOfText, adjectiveText)
        : getGenderForLemma(adjectiveText);
}

// example1: 'form of|americano|m|pl' => 'm'
// example2: 'form of|americano|pl|m' => 'm'
function getGenderForFormOf(formOfText, fullAdjectiveText) {
    let genderLetter;
    const sometimesPresentPreceder = 'adjective form|g=';
    if (fullAdjectiveText.indexOf(sometimesPresentPreceder) >= 0) {
        genderLetter = fullAdjectiveText.charAt(fullAdjectiveText.indexOf(sometimesPresentPreceder) + sometimesPresentPreceder.length);
    } else {
        const matchedBeforeEnd = /\|[mfn]\|/.exec(formOfText);
        if (matchedBeforeEnd) {
            genderLetter = matchedBeforeEnd[0].charAt(1);
        } else {
            const matchedAtEnd = /[mfn]$/.exec(formOfText);
            if (matchedAtEnd) {
                genderLetter = matchedAtEnd[0];
            }
        }
    }
    switch (genderLetter) {
        case 'm':
            return 'masculine';
        case 'f':
            return 'feminine';
        case 'n':
            return 'neuter';
        case undefined:
            throw new Error(`did not find gender for non-lemma`);
        default:
            throw new Error(`Unexpected letter found for gender for non-lemma: ${genderLetter}`)
    }
}

// ===Adjective===
// {{es-adj|f=americana}}
//
// # of the [[America]]s
// # of the [[United States]]
// returns masculine
function getGenderForLemma(adjectiveText) {
    if (adjectiveText.indexOf('g=m-p')) {
        return 'masculine';
    }
    if (adjectiveText.indexOf('g=f-p')) {
        return 'feminine';
    }

    const otherFormIsFeminine = adjectiveText.indexOf(`{{es-adj|f=`) >= 0;
    if (otherFormIsFeminine) {
        return 'masculine';
    }
    const otherFormIsMasculine = adjectiveText.indexOf(`{{es-adj|m=`) >= 0;
    if (otherFormIsMasculine) {
        return 'feminine';
    }
    throw new Error(`Could not find gender for lemma`);
}