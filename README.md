<h2>codified-spanish: a GraphQL API that serves data for Spanish words</h2>

<h3>Usage Examples</h3>


<h3>Underlying data</h3>

`codified-spanish` is powered by data from [Wiktionary](https://en.wiktionary.org/wiki/Wiktionary:Main_Page) and [SpanishDict](https://www.spanishdict.com/).  The database is populated through scripts in the `/scripts` directory of this repository (see the `README.md` in that directory for details).  When queried for a word not contained in the database, `codified-spanish` will hit Wiktionary or SpanishDict directly.
<br><br>
From the perspective of this repository, every word has the following properties:
 - `string`
 - `part of speech`
 - `meaning`
 - `lemma` ([sort of like the "plain" version of the word](https://en.wikipedia.org/wiki/Lemma_(morphology)))

Additionally, there are some properties that are unique to certain parts of speech. Specifically, verbs have a `person`, `mood`, and `tense` and adjectives and nouns have a `gender` and `number`.

Here's an example, using the first person indicative imperfect form of the verb 'hacer': `hacía`.  
 - `string: hacía`
 - `part of speech: verb`
 - `meaning: to do, to make`
 - `lemma: hacer`
 - `person: 1st`
 - `mood: indicative`
 - `tense: imperfect`
 
 
Additionally, the string 'hacía' has two other usages in Spanish: it is also the the *third* person indicative imperfect form of the verb 'hacer', as well as a proposition meaning 'towards'.  Thus, in our database, there will be two other entries with the string 'hacia':
  - third person indicative imperfect form of the verb 'hacer':
      - `string: hacía`
      - `part of speech: verb`
      - `meaning: to do, to make`
      - `lemma: hacer`
      - `person: 3rd`
      - `mood: indicative`
      - `tense: imperfect`
 - preposition for 'towards'
    - `string: hacía`
    - `part of speech: preposition`
    - `meaning: towards`
    - `lemma: hacía`
    
    
<h4>Note on Babel setup</h4>

Babel set up follows [this guide](https://www.robinwieruch.de/minimal-node-js-babel-setup/) and the babel portion of [this guide](https://jestjs.io/docs/en/getting-started), using the babel.config.js set up from the latter rather than the .babelrc setup of the former.
 
