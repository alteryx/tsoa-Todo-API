import {DataSource, DataSourceOptions} from "typeorm";
import {Task} from "../models/task.entity";

const dbconfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [Task],
  synchronize: true,
};

const dataSource = new DataSource(dbconfig);
dataSource.initialize();
export default dataSource;
