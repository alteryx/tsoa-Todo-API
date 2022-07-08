"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../models/task.entity");
const dbconfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [task_entity_1.Task],
    synchronize: true,
};
const dataSource = new typeorm_1.DataSource(dbconfig);
dataSource.initialize();
exports.default = dataSource;
