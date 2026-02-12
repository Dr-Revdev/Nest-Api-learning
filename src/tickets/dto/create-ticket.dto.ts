import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateTicketDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title!: string;
}