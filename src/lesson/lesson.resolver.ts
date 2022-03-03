import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { StudentType } from "src/student/student.type";
import { AssignStudentsToLessonInput } from "./assign-student-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { LessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of=>LessonType)
export class LessonResolver{
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ){}
    @Query(returns=>[LessonType])
    lesson(){
        return this.lessonService.getAll();
    }
    @Query(returns=>LessonType)
    lessonById(@Args('id') id: string){
        return this.lessonService.getLessonById(id);
    }
    // @Mutation(returns=>LessonType)
    // createLesson(@Args('name') name: string, @Args('startDate') startDate: Date, @Args('endDate') endDate: Date) {
    //     return this.lessonService.createLesson(name, startDate, endDate);
    // }
    @Mutation(returns=>LessonType)
    createLesson(@Args('lessonInput') lessonInput: LessonInput ) {
        return this.lessonService.createLesson(lessonInput);
    }
    @Mutation(returns=>LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLessonInput')assignStudentsToLessonInput: AssignStudentsToLessonInput ){
        const {lessonId, studentIds} = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }
    @ResolveField(()=>[StudentType])
    resolverLessonStudents(@Parent() lesson: Lesson){
        return this.studentService.findStudentByIds(lesson?.studentIds);
    }
}