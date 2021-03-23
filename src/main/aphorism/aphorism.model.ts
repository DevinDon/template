export interface Aphorism {

  author?: string;

  content: string;

  timestamp: Date;

  like: number;

}

export type AphorismID = string;

export type AphorismInsertParams = Pick<Aphorism, 'content'> & Partial<Pick<Aphorism, 'author' | 'timestamp'>>;

export type AphorismUpdateParams = AphorismInsertParams;
