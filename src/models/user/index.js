import Sequelize from "sequelize";
import sequelizeConn from "../connection";

export default sequelizeConn.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
