import { IAuthRepository } from './respositories/interfaces/IAuthRepository';
import { ApplicationException } from '../common/exceptions/application.exception';
import { IUserCreateDto } from '../dtos/user.dto';

export class IdentityService {

  constructor( private readonly authRepository: IAuthRepository){}

  public async authenticate(email: string, password: string ): Promise<string> {
    try {
      return await this.authRepository.authenticate(email, password);
    } catch (error) {
      throw new ApplicationException(String(error));
    }
  }

  public async create(user: IUserCreateDto) {
    try {
      await this.authRepository.create(user);
    } catch (error) {
      throw new ApplicationException(String(error));
    }
  }
}


