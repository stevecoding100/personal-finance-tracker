import { knexConfig } from "./src/config/config";

export default knexConfig;

// >>> For inside docker environment
// docker-compose exec backend npx knex migrate:latest --knexfile knexfile.ts --env production
// docker-compose exec backend npx knex migrate:latest --env development

// >>>> For Localhost environment
// npx knex migrate:rollback --all --env development
//npx knex migrate:latest --env development
