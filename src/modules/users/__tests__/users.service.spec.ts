import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { prismaMock } from '../../../db/singleton';
import prisma from "../../../db/client";
import { Prisma, PrismaClient } from '@prisma/client';


describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    userService = new UsersService(prisma)
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  })

  it('create user success', async () => {
    const user = await userService.create({
      email: "test@mock.com",
      firstName: "Test Mock",
      lastName: "Mock",
      password: "Test1234!"
    })
    expect(user.email).toEqual("test@mock.com")
  })

  it('find all user result 1 success', async () => {
    const user = await userService.create({
      email: "test@mock.com",
      firstName: "Test Mock",
      lastName: "Mock",
      password: "Test1234!"
    })

    const users = await userService.findAll();

    expect(users.length).toEqual(1)
  })

  it('find user by email result 1 success', async () => {
    const user = await userService.create({
      email: "test@mock.com",
      firstName: "Test Mock",
      lastName: "Mock",
      password: "Test1234!"
    })

    const emailUser = await userService.findByEmail(user.email);

    expect(emailUser.email).toEqual("test@mock.com")
  })

  it("find user by id result 1 success", async () => {
    const user = await userService.create({
      email: "test@mock.com",
      firstName: "Test Mock",
      lastName: "Mock",
      password: "Test1234!"
    })

    const userWithId = await userService.findOne(user.id);

    expect(userWithId.id).not.toBeNull()
  })

  it("update user result success", async () => {
    const user = await userService.create({
      email: "test@mock.com",
      firstName: "Test Mock",
      lastName: "Mock",
      password: "Test1234!"
    })

    const updatedUser = await userService.update(user.id, {
      firstName : "test success"
    })

    expect(updatedUser.firstName).toEqual("test success");
  })

  it('delete user result success', async () => {
    const user = await userService.create({
      email: "test@mock.com",
      firstName: "Test Mock",
      lastName: "Mock",
      password: "Test1234!"
    })

    const userDeleted = await userService.remove(user.id)

    const countUser = await userService.findAll();

    expect(countUser.length).toEqual(0);
  })
});
