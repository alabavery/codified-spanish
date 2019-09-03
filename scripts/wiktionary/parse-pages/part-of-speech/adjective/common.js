/**
 * If an adjective is not the lemma, then it should contain
 * something like the following:
 * {{es-adj form of|americano|m|pl}}
 * From this, you can extract the lemma (americano), the gender (m),
 * and the number (n).
 * This method should return 'form of|americano|m|pl' for the
 * example above, which extractors can use.
 *
 * IF THE ADJECTIVE IS THE LEMMA, return null.
 */
export const getFormOfText = adjectiveText => {
    const preceder = 'form of|';
    const startOfFormOf = adjectiveText.indexOf(preceder);
    if (startOfFormOf < 0) {
        return null;
    }
    const textAfterPreceder = adjectiveText.slice(startOfFormOf + preceder.length);
    const end = textAfterPreceder.indexOf('}}');
    if (!end) {
        throw new Error(`No end delimiter '}}' found for form of text`);
    }
    return textAfterPreceder.slice(0, end);
};