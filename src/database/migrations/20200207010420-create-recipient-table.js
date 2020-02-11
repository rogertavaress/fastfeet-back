'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recipients', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rua: {
                type: Sequelize.STRING,
            },
            numero: {
                type: Sequelize.STRING,
            },
            complemento: {
                type: Sequelize.STRING,
            },
            estado: {
                type: Sequelize.STRING,
            },
            cidade: {
                type: Sequelize.STRING,
            },
            cep: {
                type: Sequelize.STRING,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('recipients');
    },
};
