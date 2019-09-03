export const getValueFromWord = (word, dataType) =>
    (word.find(dataPoint => dataPoint.dataType === dataType) || {}).value;