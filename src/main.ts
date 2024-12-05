import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClientValidationError } from "./db/exceptions/prisma-validation-error";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: true,
		}),
	);
	app.enableCors({
		origin: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
	});

	const { httpAdapter } = app.get(HttpAdapterHost);

	app.useGlobalFilters(new PrismaClientValidationError(httpAdapter));
	await app.listen(3000);
}
bootstrap();
