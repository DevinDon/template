import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Motto } from './motto.model';

@Entity('motto')
export class MottoEntity extends BaseEntity implements Motto {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  id!: number;

  @Column({ nullable: true })
  author?: string;

  @Column()
  content!: string;

  @Column()
  date!: Date;

  @Column({ default: 0 })
  like!: number;

}
