import Sequelize from 'sequelize';

const sequelize = new Sequelize('codified-spanish', 'alavery', '', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
});
const sequelize = new Sequelize('postgres://juwfhddomnoezp:f9db989b90cbefb145aff0dbc50f7ec243de9f4b7eb2756061d56aa762ed5b2c@ec2-54-83-9-36.compute-1.amazonaws.com:5432/dd3am2e2dguhs1', {
    dialect:  'postgres',
    protocol: 'postgres',
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
    // "ssl": true,
    // "dialectOptions": { "ssl": true }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize.sync();

export default sequelize;