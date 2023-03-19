import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport"
import {Strategy, VerifyCallback} from 'passport-google-oauth20'


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            clientID: "810916055599-rhp4845pplkdfs8t58ve11lemfv3jfs4.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth-google/callback",
            scope: ['email', 'profile']
        })
    }

    async validate(profile: any, done: VerifyCallback): Promise<unknown | any>{
        const {name, emails, photos} = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value
        }

        done(null, user)
    }
}