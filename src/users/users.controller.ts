import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import {
  BadRequestResponse,
  NotFound,
} from 'src/users/entities/common.entities'
import { User } from 'src/users/entities/users.entity'
import { UsersService } from 'src/users/users.service'

@ApiTags('User')
@Controller('users')
export class UsersController {
  //I  want UserService to be automatically injected to this controller
  constructor(private userService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string): User[] {
    return this.userService.findAll(name)
  }

  @ApiOkResponse({ type: User, isArray: false })
  @ApiNotFoundResponse({ type: NotFound })
  @Get(':id')
  getUserById(@Param('id') id: string): User {
    //TODO: auto type cast later, ParseIntPipe
    const foundUser = this.userService.getUserById(id)
    if (foundUser) {
      return foundUser
    } else {
      throw new NotFoundException('User not Found')
    }
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body)
  }
}
