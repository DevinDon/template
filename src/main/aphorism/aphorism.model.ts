/** 格言 */
export interface Aphorism {

  /** 作者 */
  author: string;

  /** 内容 */
  content: string;

  /** 发布日期 */
  timestamp: Date;

  /** 点赞 */
  like: number;

}

export type AphorismID = string;

export type AphorismParamInsert = Pick<Aphorism, 'author' | 'content' | 'timestamp'>;

export type AphorismParamUpdate = Pick<Aphorism, 'author' | 'content'>;
