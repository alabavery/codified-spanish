import getLemma from './lemma';

export default function (nounText) {
    // todo needs to be smarter??
    // todo are all lemmas singular?
    if (!getLemma(nounText)) {
        // this is the lemma
        return false; // todo are all lemmas singular?
    }
    // todo needs to be smarter??
    return nounText.indexOf('plural') > 0;
}