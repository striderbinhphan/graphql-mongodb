import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(()=> [StudentType])
  getStudents(){
    return this.studentService.findAll();
  }

  @Query(()=> StudentType)
  getStudentById(@Args('id') id: string){
    return this.studentService.findOne(id);
  }
}
