import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { Application } from 'express';
import { AuthMySQLRepository } from './services/respositories/impl/mysql/auth.repository';


export default (app: Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC"
  });

  container.register({
    authRepository: asClass(AuthMySQLRepository).scoped(),
  });

  app.use(scopePerRequest(container));
}

