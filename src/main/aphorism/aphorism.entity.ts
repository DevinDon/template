import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Aphorism } from './aphorism.model';
import { Index } from 'typeorm';

@Entity('aphorism')
export class AphorismEntity extends BaseEntity implements Aphorism {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true })
  id!: number;

  @Column()
  @Index()
  author!: string;

  @Column()
  content!: string;

  @Column()
  date!: Date;

  @Column({ default: 0 })
  like!: number;

}
