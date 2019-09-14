import uuid from 'uuid/v4';
import { Lemma, Word } from "../../src/models";
import {getParamsFromCommandLine, logAndExit} from "../utils/command-line-utils";
import {getAllFileNamesFromDirectory, getJsonDataFromFile} from "../utils/file-io-utils";
import {getValueFromWord} from "../utils/data-utils";

if (require.main === module) {
    const { args, options } = getParamsFromCommandLine({ sourceDirectory: null });
    resolveSourceFiles(options.sourceDirectory, args).then(filePaths => {
        Word.sync().then(() => {
            Lemma.sync().then(() => {
                seed(filePaths)
                    .then(created => {
                        console.log(`Added ${created.length} words!`);
                    });
            });
        });
    });
}

async function resolveSourceFiles(sourceDirectory, args) {
    const filePaths = sourceDirectory ? await getAllFileNamesFromDirectory(sourceDirectory, true) : args;
    if (!filePaths || !filePaths.length) {
        logAndExit(`Received no files to seed from!`);
    }
    return sourceDirectory ? await getAllFileNamesFromDirectory(sourceDirectory, true) : args;
}

async function getDataFromFiles(files) {
    const data = [];
    for (let i = 0; i < files.length; i += 1) {
        data.push(...await getJsonDataFromFile(files[i]));
    }
    return data;
}

async function seed(sourceFiles) {
    const fileContents = await getDataFromFiles(sourceFiles);
    const words = [];
    const wordIdToLemmaId = await createLemmas(fileContents);

    for (let i = 0; i < fileContents.length; i += 1) {
        const wordId = getValueFromWord(fileContents[i], 'id');
        const wordObject = fileContents[i].reduce((fullWord, dataObject) => ({
            ...fullWord,
            [dataObject.dataType]: dataObject.value,
        }), {});
        wordObject.lemmaId = wordIdToLemmaId[wordId];
        try {
            const wordEntity = new Word(wordObject);
            await wordEntity.validate();
        } catch (e) {
            logAndExit(`Validation error for word ${wordId}: ${e.message}`);
        }
        words.push(wordObject);
    }
    return Word.bulkCreate(words);
}


async function createLemmas(fileContents) {
    const existingLemmas = await Lemma.findAll();
    const lemmasToCreate = [];
    const wordIdToLemmaId = {};

    for (let i = 0; i < fileContents.length; i += 1) {
        if (!Array.isArray(fileContents[i])) {
            logAndExit(`item ${i} in source file is not an array`);
        }
        const word = fileContents[i];
        const wordId = getValueFromWord(word, 'id');
        if (!wordId) {
            logAndExit(`No id found on item ${i} of source file`);
        }

        const wordString = getValueFromWord(word, 'string');
        if (!wordString) {
            logAndExit(`No string for word with id ${wordId}`);
        }
        const lemmaFromWord = getValueFromWord(word, 'isLemma')
            ? wordString
            : getValueFromWord(word, 'lemma');

        if (!lemmaFromWord) {
            logAndExit(`Could not get lemma from item ${wordId}`);
        }
        const partOfSpeech = getValueFromWord(word, 'partOfSpeech');
        if (!partOfSpeech) {
            logAndExit(`Could not get partOfSpeech from item ${wordId}`);
        }

        const meanings = getValueFromWord(word, 'meanings');
        const existingLemmaForWord = existingLemmas.find(
            lemma => lemma.string === lemmaFromWord && lemma.partOfSpeech === partOfSpeech,
        );
        if (existingLemmaForWord) {
            wordIdToLemmaId[wordId] = existingLemmaForWord.id;
            if (!existingLemmaForWord.meanings || !existingLemmaForWord.meanings.length) {
                // if a previous seed did not have a meanings available for the lemma, we can add it now using this word
                await existingLemmaForWord.update({ meanings })
            }
        } else {
            const alreadyAddedLemmaToCreate = lemmasToCreate.find(
                lemma => lemma.string === lemmaFromWord && lemma.partOfSpeech === partOfSpeech,
            );
            if (alreadyAddedLemmaToCreate) {
                wordIdToLemmaId[wordId] = alreadyAddedLemmaToCreate.id;
                if (!alreadyAddedLemmaToCreate.meanings || !alreadyAddedLemmaToCreate.meanings.length) {
                    // if did not have a meanings available for the lemma, we can add it now using this word
                    alreadyAddedLemmaToCreate.meanings = meanings;
                }
            } else {
                const lemmaId = uuid();
                wordIdToLemmaId[wordId] = lemmaId;
                lemmasToCreate.push({ id: lemmaId, partOfSpeech, meanings, string: lemmaFromWord })
            }
        }
    }
    if (lemmasToCreate.length) {
        await Lemma.bulkCreate(lemmasToCreate);
    }
    return wordIdToLemmaId;
}
