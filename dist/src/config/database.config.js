"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.parseDatabaseConfig = void 0;
function parseDatabaseConfig() {
    const type = process.env.DB_CONNECTION;
    const synchronize = false;
    const autoLoadEntities = true;
    const database = process.env.DB_DATABASE;
    const port = parseInt(process.env.DB_PORT);
    const host = process.env.DB_HOST;
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    return {
        type,
        database,
        username,
        password,
        port,
        host,
        synchronize,
        autoLoadEntities,
        logging: true,
    };
}
exports.parseDatabaseConfig = parseDatabaseConfig;
exports.config = parseDatabaseConfig();
//# sourceMappingURL=database.config.js.map