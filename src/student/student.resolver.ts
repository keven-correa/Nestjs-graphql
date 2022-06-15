import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { createStudentInput } from "./student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService){}

    @Mutation(returns => StudentType)
    async createStudent(@Args('createStudentInput') createStudentInput: createStudentInput){
        return await this.studentService.createStudent(createStudentInput);
    }

    @Query(returns => [StudentType])
    async students(){
        return this.studentService.getStudents();
    }

    @Query(returns => StudentType)
    async getStudent(@Args('id') id: string){
        return this.studentService.getStudent(id);
    }

}