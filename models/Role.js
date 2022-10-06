const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Department = require('./Department');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        salary: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false
        },
        department_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Department,
                key: 'id'
            }
        }
    }
);

module.exports = Role;

