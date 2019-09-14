import {Op} from "sequelize";

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

export default { buildWhere };