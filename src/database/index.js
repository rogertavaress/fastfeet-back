import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

const models = [];

class database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new database();
