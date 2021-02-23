"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableUrls1613949706298 = void 0;
const typeorm_1 = require("typeorm");
class createTableUrls1613949706298 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'urls',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'old_url',
                    type: 'varchar(2048)',
                },
                {
                    name: 'new_url',
                    type: 'varchar(10)',
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        return queryRunner.dropTable('urls');
    }
}
exports.createTableUrls1613949706298 = createTableUrls1613949706298;
//# sourceMappingURL=1613949706298-createTableUrls.js.map