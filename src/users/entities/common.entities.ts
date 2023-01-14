import { ApiProperty } from '@nestjs/swagger'

export class NotFound {
  @ApiProperty()
  statusCode: number
  @ApiProperty()
  message: string
  @ApiProperty()
  error: string
}
export class BadRequestResponse {
  @ApiProperty()
  statusCode: number
  @ApiProperty()
  message: string[]
  @ApiProperty()
  error: string
}
