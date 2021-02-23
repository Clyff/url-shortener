"use strict";
const database_config_1 = require("./src/config/database.config");
module.exports = Object.assign(Object.assign({}, database_config_1.config), { migrations: ['./src/migrations/**/*.ts'], entities: ['./src/modules/**/*.entity.{ts,js}'], cli: {
        migrationsDir: 'src/migrations',
    } });
//# sourceMappingURL=ormconfig.js.map