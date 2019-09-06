import Sequelize from "sequelize";
import sequelizeConn from '../connection';

export default sequelizeConn.define('word', {
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
    person: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    mood: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    tense: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isPlural: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});