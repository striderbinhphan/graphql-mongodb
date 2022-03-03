import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import {v4 as uuid} from 'uuid'
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ){}
  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = await this.studentRepository.create({
      id: uuid(),
      ...createStudentInput
    })
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    const student: Student = await this.studentRepository.findOne({id});
    if(!student){
      throw new NotFoundException(`Invalid student id ${id}`);
    }
    return student;
  }
  async findStudentByIds(studentIds: string[]): Promise<Student[]>{
    const students = await this.studentRepository.find({
      where:{
        id: {
          $in: studentIds
        }
      }
    })
    return students;
  }
}
