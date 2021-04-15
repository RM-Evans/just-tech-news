const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//create our USER MODEL
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        //define an id column
        id: {
            // use the special sequalize datatybes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define username COLUMN
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email COLUMN
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicat email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define password COLUMN
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //password must be at least 4 characters long
                len: [4]
            }
        }
    },
    //hooks in second object
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);


module.exports = User;






//define table columns and configuration
// User.init(
//     {
//         //TODO table column definitions HERE
//     },
//     {
//         //TODO table config options go here (https://sequelize.org/v5/manual/models-definition.html#configuration))

//         // pass in our imported sequelize connection (the direct connection to our database)
//         sequelize,
//         //dont automatically create createdAt/updatedAt timestamp fields
//         timestamps: false,
//         //dont pluralize name of database table
//         freezeTableName: true,
//         //use underscores instead of camelcase
//         underscored: true,
//         //make it so our model name stays lowercase in the database
//         modelName: 'user'
//     }
// );
