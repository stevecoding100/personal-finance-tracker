import { knexConfig } from "./src/config/config";

export default knexConfig;

// docker-compose exec backend npx knex migrate:latest --knexfile knexfile.ts --env production
