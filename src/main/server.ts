import express from 'express';

import { errorHandler } from '@infrastructure/http/middlewares/errorHandler';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { pokedexRoutes } from '@infrastructure/http/routes/pokedex.routes';
import { trainerRoutes } from '@infrastructure/http/routes/trainer.routes';

import { setupSwagger } from '@main/config/swagger';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  return res.status(200).json({
    message: 'PokéManager API está funcionando!',
  });
});

// 1. Documentação Swagger
setupSwagger(app);

// 2. Rotas
app.use('/api/v1/pokemons', pokemonRoutes);
app.use('/api/v1/pokedex', pokedexRoutes);
app.use('/api/v1/trainers', trainerRoutes);

// 3. Middleware global de erros
// Deve ficar depois das rotas
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${PORT}`);

  console.log(`[docs]: Swagger rodando em http://localhost:${PORT}/api/docs`);

  console.log(
    `[docs]: Swagger também disponível em http://localhost:${PORT}/swagger`,
  );
});
