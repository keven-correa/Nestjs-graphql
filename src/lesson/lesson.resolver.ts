import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssingStudentsToLessonInput } from './assing-students.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService,
    private studentService: StudentService) {}

  @Query((returns) => [LessonType])
   async lessons (){
    return await this.lessonService.getLessons()
  }

  @Query((returns) => LessonType)
  async lesson(@Args('id') id: string) {
    return await this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ) {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async assingStudentsToLesson(
    @Args('assingStudentsToLesson') assingStudentsToLessonInput: AssingStudentsToLessonInput
  ){
    const {lessonId, studentsIds} = assingStudentsToLessonInput;
    return await this.lessonService.assingStudentsToLesson(lessonId, studentsIds)
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson){
    return await this.studentService.getManyStudents(lesson.students);
  }
}
