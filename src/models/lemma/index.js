import Sequelize from "sequelize";
import sequelizeConn from "../connection";

export default sequelizeConn.define('lemma', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    string: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    partOfSpeech: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    meanings: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
});