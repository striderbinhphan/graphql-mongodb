import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, MinLength } from "class-validator";
import { StudentType } from "src/student/student.type";
@InputType('LesonInput')
export class LessonInput {
    @Field()
    @MinLength(1)
    name: string

    @Field()
    @IsDateString()
    startDate: string;

    @Field()
    @IsDateString()
    endDate: string;

    @Field(()=> [ID])
    studentIds: string[]
}