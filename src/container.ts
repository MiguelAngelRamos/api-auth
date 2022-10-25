import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { Application } from 'express';
import { IdentityService } from './services/indentity.service';
import { AuthMySQLRepository } from './services/respositories/impl/mysql/auth.repository';


export default (app: Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC"
  });

  container.register({
    authRepository: asClass(AuthMySQLRepository).scoped(),
    identityService: asClass(IdentityService).scoped()
  });

  app.use(scopePerRequest(container));
}

