import { IsDate, IsIP, Length } from 'class-validator';
import { IncomingHttpHeaders } from 'http';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('access')
export class AccessEntity extends BaseEntity {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Length(3, 10)
  @Column()
  method!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  params?: string;

  @IsDate()
  @Column()
  timestamp!: Date;

  @IsIP()
  @Column()
  ip!: string;

  @Column()
  headers!: IncomingHttpHeaders;

  @Column()
  version!: string;

  @Column()
  request!: any;

  @Column()
  response!: {
    statusCode: number;
    statusMessage: string;
    length: number;
  };

}
