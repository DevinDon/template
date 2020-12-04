/** 格言 */
export interface Motto {

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

export type MottoID = Motto['id'];

export type MottoParamInsert = Pick<Motto, 'author' | 'content' | 'date'>;

export type MottoParamUpdate = Pick<Motto, 'author' | 'content'>;
