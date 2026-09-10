import express from 'express';

import { errorHandler } from '@infrastructure/http/middlewares/errorHandler';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';

import { setupSwagger } from '@main/config/swagger';

const app = express();

app.use(express.json());

// 1. Documentação Swagger
setupSwagger(app);

// 2. Rotas
app.use('/api/v1/pokemons', pokemonRoutes);

// 3. Middleware global de erros
// Deve ficar depois das rotas
app.use(errorHandler);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${PORT}`);

  console.log(`[docs]: Swagger rodando em http://localhost:${PORT}/api/docs`);
});
