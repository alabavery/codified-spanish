import Word from "./word";
import Lemma from "./lemma";

Lemma.hasMany(Word);
Word.belongsTo(Lemma);

export { Lemma, Word };