import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { UsersModule } from "src/modules/users/users.module";
import { RolesModule } from "../roles/roles.module";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";
import { SignInUseCase } from "./use-cases/sign-in.use-case";
import { SignUpUseCase } from "./use-cases/sign-up.use-case";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.use-case";

@Module({
	imports: [UsersModule, RolesModule, PassportModule],
	controllers: [AuthController],
	providers: [
		AccessTokenStrategy,
		RefreshTokenStrategy,
		RefreshTokenUseCase,
		SignInUseCase,
		SignUpUseCase,
	],
})
export class AuthModule {}
