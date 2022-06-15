import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssingStudentsToLessonInput{
    @IsUUID()
    @Field(type => String)
    lessonId: string

    @IsUUID("4", {each: true})
    @Field(type => [ID])
    studentsIds: string[]

}