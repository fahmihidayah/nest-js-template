import {
	Body,
	Controller,
	Get,
	Headers,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthFormDto } from "../dto/auth.dto";
import { RegisterFormDto } from "../dto/register.dto";
import { ROLE_USER } from "../../roles/dto/role.dto";
import { AccessTokenGuard } from "../guards/accessToken.guard";
import { getUserSerializer } from "src/modules/users/entities/user.serializer";
import { formatResponse } from "src/utils/response";
import { RefreshTokenDto } from "../dto/token.dto";
import { SignInUseCase } from "../use-cases/sign-in.use-case";
import { SignUpUseCase } from "../use-cases/sign-up.use-case";
import { RefreshTokenUseCase } from "../use-cases/refresh-token.use-case";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly signInUseCase: SignInUseCase,
		private readonly signUpUseCase: SignUpUseCase,
		private readonly refreshTokenUseCase: RefreshTokenUseCase,
	) {}

	@Post("sign-in")
	async signUp(@Body() authFormDto: AuthFormDto) {
		const response = this.signInUseCase.execute(authFormDto);
		return formatResponse({
			message: "Success Login",
			data: response,
		});
	}

	@Post("refresh-token")
	async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
		const token = await this.refreshTokenUseCase.execute(refreshTokenDto);
		return formatResponse({
			message: "Success refresh token",
			data: token,
		});
	}

	@UseGuards(AccessTokenGuard)
	@Get("profile")
	async getProfile(@Request() req) {
		return formatResponse({
			message: "Success Login",
			data: getUserSerializer(req.user),
		});
	}

	@Post("register")
	async register(@Body() form: RegisterFormDto) {
		const response = this.signUpUseCase.execute(form, ROLE_USER);
		return formatResponse({
			message: "Success Login",
			data: response,
		});
	}
}
