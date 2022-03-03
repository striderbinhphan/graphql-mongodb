import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import {v4 as uuid} from 'uuid'
import { LessonInput } from './lesson.input';
@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ){}
    async getAll(): Promise<Lesson[]> {
        return await this.lessonRepository.find();
    }
    async getLessonById(id: string): Promise<Lesson>{
        const lesson =await this.lessonRepository.findOne({id});
        if(!lesson){
            throw new NotFoundException('Invalid lesson');
        }
        return lesson;
    }
    // async createLesson(name: string, startDate: Date, endDate: Date): Promise<Lesson>{
    //     const lesson = await this.lessonRepository.create({
    //         id: uuid(),
    //         name,
    //         startDate,
    //         endDate
    //     })
    //     return await this.lessonRepository.save(lesson);
    // }
    async createLesson(lessonInput: LessonInput): Promise<Lesson>{
        const lesson = await this.lessonRepository.create({
            id: uuid(),
            ...lessonInput
        })
        console.log("lesson",lesson);
        return await this.lessonRepository.save(lesson);
    }
    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson>{
        let lesson =await this.lessonRepository.findOne({id: lessonId});
        if(!lesson){
            throw new NotFoundException('Invalid lesson');
        }
        lesson.studentIds = [...lesson.studentIds, ...studentIds];
        return await this.lessonRepository.save(lesson);
    }
}
