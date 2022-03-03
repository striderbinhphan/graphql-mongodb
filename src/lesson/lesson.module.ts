import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, Student])],
    providers: [LessonService,LessonResolver, StudentService]
})
export class LessonModule {}
