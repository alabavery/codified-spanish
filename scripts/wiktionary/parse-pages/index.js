/**
 * babel-node scripts/wiktionary/parse-pages/getWords.js --sourceDirectory=raw-data/wiktionary/pages --targetDirectory=raw-data/wiktionary/parsed/nested --verb=false
 */

import {getParamsFromCommandLine} from "../../utils/command-line-utils";
import {getAllFileNamesFromDirectory, removeTrailingSlashFromDirectory, saveDataAsJson} from "../../utils/file-io-utils";
import {generateData} from '../data-structure-handling';
import parseSinglePage from './parse-single-page';
import {getPartsOfSpeechValues} from "./parts-of-speech-constants";

const validOptions = {
    // if any part of speech is passed as an option, only those that are passed will be parsed
    // e.g. babel-node getWords.js [page paths] --noun=true
    ...getPartsOfSpeechValues().reduce((acc, pos) => ({...acc, [pos]: [true, false]}), {}),
    sourceDirectory: null,
    save: [false], // will save unless false flag passed
    targetDirectory: null,
};

if (require.main === module) {
    const {options, args} = getParamsFromCommandLine(validOptions);
    getFilePaths(options, args)
        .then(paths => parsePages(paths, options))
        .then(data => console.log(JSON.stringify(data)));
}

async function getFilePaths(options, args) {
    return options.sourceDirectory
        ? getAllFileNamesFromDirectory(options.sourceDirectory, true)
        : args;
}


/**
 *
 * @param pagePaths
 * @param options
 * @returns {Promise<void>}
 */
export async function parsePages(pagePaths, options = {}) {
    const finalOptions = await resolveOptions(options);

    const pathsByWord = pagePaths.reduce((acc, path) => {
        acc[getWordFromPagePath(path)] = path;
        return acc;
    }, {});
    const partsOfSpeechToParse = getPartsOfSpeechThatShouldParse(finalOptions);

    const allData = {};
    for (let i = 0; i < Object.keys(pathsByWord).length; i += 100) {
        const data = await generateData(
            Object.keys(pathsByWord).slice(i, i + 100),
            word => word,
            async word => parseSinglePage(
                word,
                pathsByWord[word],
                partsOfSpeechToParse,
                finalOptions,
            ),
        );
        Object.keys(data).forEach(word => allData[word] = data[word]);
        if (finalOptions.save) {
            await saveDataAsJson(data, `${finalOptions.targetDirectory}/${i}-${i + 100}.json`);
        }
    }
    return allData;
}

function getWordFromPagePath(pagePath) {
    const fileName = pagePath.split('/')[pagePath.split('/').length - 1];
    return fileName.split('_')[0];
};


function getPartsOfSpeechThatShouldParse(options = {}) {
    return getPartsOfSpeechValues().filter(pos => options[pos] === true);
}

async function resolveOptions(passedOptions) {
    const finalOptions = { ...passedOptions };

    finalOptions.save = passedOptions.save !== false;

    if (finalOptions.save) {
        if (!passedOptions.targetDirectory) {
            throw new Error(`Must include a targetDirectory to save files in!`);
        }
        finalOptions.targetDirectory = removeTrailingSlashFromDirectory(passedOptions.targetDirectory);
    }

    const preliminaryPartOfSpeechOptions = getPartsOfSpeechValues().reduce((acc, partOfSpeech) => {
        if (finalOptions[partOfSpeech] === true) {
            if (acc.falseValues.length) {
                throw new Error(`Invalid options: part of speech options must all be true or all be false`);
            }
            acc.trueValues.push(partOfSpeech);
        } else if (finalOptions[partOfSpeech] === false) {
            if (acc.trueValues.length) {
                throw new Error(`Invalid options: part of speech options must all be true or all be false`);
            }
            acc.falseValues.push(partOfSpeech);
        } else {
            acc.undefinedValues.push(partOfSpeech);
        }
        return acc;
    }, { trueValues: [], falseValues: [], undefinedValues: [] });

    const defaultFalse = !!preliminaryPartOfSpeechOptions.trueValues.length;
    getPartsOfSpeechValues().forEach(partOfSpeech => {
        if (defaultFalse && !preliminaryPartOfSpeechOptions.trueValues.includes(partOfSpeech)) {
            finalOptions[partOfSpeech] = false;
        } else if (preliminaryPartOfSpeechOptions.falseValues.includes(partOfSpeech)) {
            finalOptions[partOfSpeech] = false;
        } else {
            finalOptions[partOfSpeech] = true;
        }
    });

    return finalOptions;
}