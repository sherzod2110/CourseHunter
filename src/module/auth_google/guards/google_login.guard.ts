import { AuthGuard } from "@nestjs/passport";

export class GoogleLoginGuard extends AuthGuard('google_login'){}