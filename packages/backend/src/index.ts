import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import * as queries from './queries';
import { spawnLivePokemons } from './utils';
import { CronJob } from 'cron';

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/game-pokemons/', queries.getGamePokemons);
app.get('/live-pokemons/', queries.getLivePokemons);
app.get('/user-pokemons/:email', queries.getUserPokemons);
app.post('/save-user/', queries.saveUser);
app.post('/save-user-pokemon/', queries.saveUserPokemon);
app.get('/refresh-coordinates/', queries.refreshCoordinates);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

  // Initial spawn
  spawnLivePokemons();

  // Scheduled spawn
  const job = new CronJob('0 */1 * * * *', () => {
    spawnLivePokemons();
  });

  job.start();
});
