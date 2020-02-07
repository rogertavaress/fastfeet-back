import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                rua: Sequelize.STRING,
                numero: Sequelize.STRING,
                complemento: Sequelize.STRING,
                estado: Sequelize.STRING,
                cidade: Sequelize.STRING,
                CEP: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
}
