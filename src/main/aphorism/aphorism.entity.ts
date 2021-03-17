import { BaseEntity, Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { Aphorism } from './aphorism.model';

@Entity('aphorism')
export class AphorismEntity extends BaseEntity implements Aphorism {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  @Index()
  author!: string;

  @Column()
  content!: string;

  @Column()
  timestamp!: Date;

  @Column({ default: 0 })
  like!: number;

}
