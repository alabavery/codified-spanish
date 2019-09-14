import Sequelize from "sequelize";
import sequelizeConn from "../connection";

export default sequelizeConn.define('user_word', {
    strength: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});