import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/entities/users.entity'

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '0', name: 'Mark Johnson' },
    { id: '1', name: 'Emma Myers', age: 19 },
  ]

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      )
    } else {
      return this.users
    }
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id)
  }

  createUser(createUserDto: CreateUserDto): User {
    const id = String(Date.now())
    const createdUser = { id, name: createUserDto.name }
    this.users.push(createdUser)
    return createdUser
  }
}
