import { ObjectID } from 'typeorm';

/** 格言 */
export interface Motto {

  _id: ObjectID;

  /** 编号 */
  id: number;

  /** 作者 */
  author?: string;

  /** 内容 */
  content: string;

  /** 发布日期 */
  date: Date;

  /** 点赞 */
  like: number;

}
