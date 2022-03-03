import { ID } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity('lesson')
export class Lesson{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    studentIds: string[]
}