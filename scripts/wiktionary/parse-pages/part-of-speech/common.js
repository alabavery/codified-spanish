export function getWordForNounOrAdjective(wordString, nounOrAdjectiveText, getters) {
    const word = [];
    for (let i = 0; i < Object.keys(getters).length; i += 1) {
        const data = { dataType: Object.keys(getters)[i] };
        try {
            data.value = getters[data.dataType](wordString, nounOrAdjectiveText);
        } catch (e) {
            data.error = e.message;
        }
        if (data.dataType === 'lemma') {
            if (data.error) {
                word.push({ dataType: 'isLemma', error: data.error });
            } else {
                word.push({
                   dataType: 'isLemma',
                   value: data.value === null || data.value === wordString,
                });
            }
        }
        word.push(data);
    }
    return word;
}