import getIsPlural from './isPlural';

export default function (nounText) {
    const isPlural = getIsPlural(nounText);

    if (!isPlural) {
        const preceder = '{{es-noun|';
        const precederStart = nounText.indexOf(preceder);
        if (precederStart < 0) {
            throw new Error(`No preceder found for singular`);
        }
        const matched = /[mfn][|}]/.exec(nounText.slice(precederStart + preceder.length));
        if (!matched) {
            throw new Error(`No gender letter found for singular`);
        }
        return handleLetter(matched[0]);
    } else {
        // throw new Error(`Non-lemma extraction for gender of plural not yet implemented`);
        const preceder = 'g=';
        const precederStart = nounText.indexOf(preceder);
        if (precederStart < 0) {
            throw new Error(`No preceder found for plural`);
        }
        return handleLetter(
            nounText.slice(
                precederStart + preceder.length,
                precederStart + preceder.length + 1,
            ),
        );
    }
}

function handleLetter(letter) {
    if (letter.indexOf('m') >= 0) {
        return 'masculine';
    }
    if (letter.indexOf('f') >= 0) {
        return 'feminine';
    }
    if (letter.indexOf('n') >= 0) {
        return 'neuter';
    }
    throw new Error(`Unexpected letter for gender: '${letter}'`)
}