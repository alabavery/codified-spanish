import {getParamsFromCommandLine} from "../../utils/command-line-utils";
import {getAllFileNamesFromDirectory} from "../../utils/file-io-utils";
import uuid from 'uuid/v4';

if (require.main === module) {
    const { args, options } = getParamsFromCommandLine({ sourceDirectory: null, targetDirectory: null });
    if (options.sourceDirectory && options.targetDirectory) {
        getAllFileNamesFromDirectory(options.sourceDirectory).then(
            files => files.forEach(
                fileName => flatten(
                    `${options.sourceDirectory}/${fileName}`,
                    `${options.targetDirectory}/${fileName}`,
                )
                    .then(pageErrors => console.log(JSON.stringify({ fileName, pageErrors}))),
            ),
        );
    } else {
        flatten(args[0], args[1]).then(pageErrors => console.log(JSON.stringify({pageErrors})))
    }
}


import {getJsonDataFromFile, saveDataAsJson} from "../../utils/file-io-utils";

async function flatten(sourceFile, targetFile) {
    const data = await getJsonDataFromFile(sourceFile);
    const pageErrors = [];
    const flattened = [];

    for (let i = 0; i < Object.values(data).length; i += 1) {
        const page = Object.values(data)[i];
        const wordString = Object.keys(data)[i];

        if (!Array.isArray(page.data)) {
            throw new Error(`data for ${wordString} is not an array`);
        }
        if (page.error !== null && typeof page.error !== 'string') {
            throw new Error(`Error for ${wordString} is neither null nor a string`);
        }
        if (page.error) {
            pageErrors.push({wordString, error: page.error});
            continue;
        }
        for (let partOfSpeechCounter = 0; partOfSpeechCounter < page.data.length; partOfSpeechCounter += 1) {
            const {words, partOfSpeech} = page.data[partOfSpeechCounter];
            if (typeof partOfSpeech !== 'string') {
                throw new Error(`Type of partOfSpeech for item ${partOfSpeechCounter} in ${wordString} data is not string`);
            }
            if (!words || !words.length) {
                throw new Error(`No words found for ${wordString}'s ${partOfSpeech}`);
            }
            flattened.push(
                ...words
                    .map(wordData => [
                        ...wordData,
                        { dataType: 'partOfSpeech', value: partOfSpeech },
                        { dataType: 'id', value: uuid() },
                        { dataType: 'string', value: wordString },
                    ]),
            );
        }
    }
    await saveDataAsJson(flattened, targetFile);
    return pageErrors;
}
