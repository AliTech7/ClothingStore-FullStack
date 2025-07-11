import { Body, Controller, Get, Post, Param, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("signup")
  async signup(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.login(body.email, body.password);
    return {
      message: "Login Successful",
      userId: user._id,
      name: user.name,
    };
  }

  @Get(":email")
  async getUser(@Param("email") email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}