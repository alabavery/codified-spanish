export default function (pageText) {
    // get from ==Spanish== to end of file or to next language
    const startIndicator = "==Spanish==";
    const startsAt = pageText.indexOf(startIndicator);
    if (startsAt < 0) {
        throw new Error(`Did not find start of language`);
    }
    const afterStart = pageText.slice(startsAt + startIndicator.length);
    const nextLanguageStarts = /\s==[^=]\S*[^=]==\s/.exec(afterStart);
    return nextLanguageStarts
        ? afterStart.slice(0, nextLanguageStarts.index)
        : afterStart;
}