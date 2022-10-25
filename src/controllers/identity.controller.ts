import { ErrorBaseController } from "../common/error-controllers/error-base.controller";
import { IdentityService } from '../services/indentity.service';
import { route, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { IUserCreateDto } from "../dtos/user.dto";

@route('/identity')
export default class IdentityController extends ErrorBaseController {

  constructor(private identityService: IdentityService ) {
    super();
  }

  @route('/authenticate')
  @POST()
  public async index(req: Request, res: Response) {
    try {
      const result = await this.identityService.authenticate(req.body.email, req.body.password);

      //* el token 
      res.send(result);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/create')
  @POST()
  public async create(req: Request, res: Response) {
    try {
      await this.identityService.create({
        email: req.body.email,
        password: req.body.password
      } as IUserCreateDto)
    } catch (error) {
      this.handleException(error, res);
    }
  }


}