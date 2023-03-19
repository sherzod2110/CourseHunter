import { AuthGuard } from "@nestjs/passport";

export class GoogleRegisterGuard extends AuthGuard('google_register'){}