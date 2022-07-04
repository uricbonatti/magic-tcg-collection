import { container } from 'tsyringe';
import { Request, Response } from 'express';
import MethodLogger from '@shared/utils/MethodLogger';
import SignInService from '../services/SignInService';
import SignUpService from '../services/SignUpService';
import { instanceToPlain } from 'class-transformer';

class AuthController {
  @MethodLogger()
  public async signUp(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const signUpService = container.resolve(SignUpService);
    const signup = await signUpService.run({ email, password });
    return res.status(201).json(instanceToPlain(signup));
  }

  @MethodLogger()
  public async signIn(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const signInService = container.resolve(SignInService);
    const { player, token } = await signInService.run({ email, password });
    return res.status(200).json({ player: instanceToPlain(player), token });
  }
}

export default AuthController;
