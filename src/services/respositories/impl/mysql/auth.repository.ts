//* importar la conexion a mysql
import connector from "../../../../common/persistence/mysql.persistence";
import SHA from 'sha.js';
import jwt from 'jsonwebtoken';
import { IAuthRepository } from '../../interfaces/IAuthRepository';
import { IUserCreateDto } from "../../../../dtos/user.dto";
import { ApplicationException } from '../../../../common/exceptions/application.exception';

export class AuthMySQLRepository implements IAuthRepository {

  public async authenticate(email: string, password: string): Promise<string> {
    const con = connector;
    password = SHA('sha256').update(password).digest('base64');

    //* vamos a hacer la consulta de los usuarios registrados
    const [rows]: any [] = await con.execute(
      'SELECT * FROM auth_user WHERE email = ? AND password = ?',
      [email, password]
    )

    if(process.env.jwt_secret_key) {

      const secretKey: string = process.env.jwt_secret_key;

      if(rows.length) {
        //* payload {}
        return jwt.sign({
          id: rows[0].id,
          email: rows[0].email
        }, secretKey , { expiresIn: "2h"})
      }
    } else {
      throw new Error('Secret key is not defined');
    }
    // 'invalid user credentials supplied'
    throw new ApplicationException('invalid user credentials supplied');
  }

  public async create(user: IUserCreateDto): Promise<void> {

    const con = connector;

    //* hash password top secret
    user.password = SHA('sha256').update(user.password).digest('base64');
    //* top secret -> jfkjfjaf108194801jf1jf10j./i3oi41491'7
    
    await con.execute(
      'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
      [user.email, user.password, new Date()]
      );

  }

}