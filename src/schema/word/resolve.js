import { Op } from 'sequelize';
import { Lemma, Word } from "../../models";

export default async function(_, args) {
    return Word.findAll(buildWhere(args));
}

function buildWhere(whereObj) {
    if (!whereObj || !(Object.keys(whereObj).length)) {
        return;
    }
    return {
        where: Object.keys(whereObj).reduce((acc, columnName) => {
            if (Array.isArray(whereObj[columnName])) {
                acc[columnName] = { [Op.or]: whereObj[columnName] };
            } else {
                acc[columnName] = whereObj[columnName];
            }
            return acc;
        }, {}),
    };
}