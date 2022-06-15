import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { createStudentInput } from './student.input';
import {v4 as uuid} from 'uuid';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>){}

    async createStudent(createStudentInput: createStudentInput): Promise<Student> {
        const {firstName, lastName} = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        })
        return await this.studentRepository.save(student);
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOneBy({id});
    }

    async getManyStudents(studentsIds: string[]): Promise<Student[]>{
        return await this.studentRepository.find({
            where: {
                id: In([studentsIds])
            }
        })
    }
}
