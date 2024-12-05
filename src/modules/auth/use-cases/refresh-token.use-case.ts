import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "../dto/token.dto";

@Injectable()
export class RefreshTokenUseCase {
	constructor(private _jwtService: JwtService) {}

	async execute(refreshTokenDto: RefreshTokenDto): Promise<string> {
		const tokenWithUser = await this._jwtService.verifyAsync(
			refreshTokenDto.refreshToken,
		);
		const accessToken = await this._jwtService.signAsync({
			sub: tokenWithUser.user.id,
			email: tokenWithUser.user.email,
		});
		return accessToken;
	}
}
