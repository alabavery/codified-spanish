// return null if this is the lemma
export default function (nounText) {
    // these seems to only be present on non-lemmas
    const preceders = [
        'noun of|',
        'plural of|',
        'plural of|es|',
        'inflection of|',
    ];

    for (const preceder of preceders) {
        const precederFoundAt = nounText.indexOf(preceder);
        if (precederFoundAt >= 0) {
            const afterPrecederText = nounText.slice(precederFoundAt + preceder.length);
            const endOfLemma = afterPrecederText.indexOf('|') > 0
                ? afterPrecederText.indexOf('|')
                : afterPrecederText.indexOf('}}');
            if (endOfLemma < 0) {
                throw new Error(`No end delimiter found when searching for lemma`);
            }
            return afterPrecederText.slice(0, endOfLemma);
        }
    }
    return null;
}