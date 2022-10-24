import { IUserCreateDto } from "../../../dtos/user.dto";

export interface IAuthRepository {
  authenticate(email: string, password: string): Promise<string>;
  create(user: IUserCreateDto): Promise<void>;

  // suma = 1 + 1;
  // setTimeout(()=>{
  //   console.log('soy el timeout e imprimo' + 10);
  // }, 3000);
  // resta = 20-10;

}

//* 2
//* 10
//* soy el timeout e imprimo' + 10
