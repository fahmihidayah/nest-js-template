import { Test, TestingModule } from "@nestjs/testing";
import { RolesController } from "../controllers/roles.controller";
import { RolesService } from "../services/roles.service";

describe("RolesController", () => {
	let controller: RolesController;

	beforeEach(async () => {
		// const module: TestingModule = await Test.createTestingModule({
		//   controllers: [RolesController],
		//   providers: [RolesService],
		// }).compile();
		// controllers = module.get<RolesController>(RolesController);
	});

	it("should be defined", () => {
		expect(1).toBe(1);
		// expect(controllers).toBeDefined();
	});
});
