import Word from "./word";
import Lemma from "./lemma";
import User from './user';
import UserWord from './userWord';

Lemma.hasMany(Word);
Word.belongsTo(Lemma);
Word.hasMany(UserWord);
User.hasMany(UserWord);
UserWord.belongsTo(Word);
UserWord.belongsTo(User);

export { Lemma, User, UserWord, Word };