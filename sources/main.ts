import { getLogger } from 'log/mod.ts';

export interface User {
  name: string;
  age: number;
}

export const greeting = ({ name, age }: User) => `Hello, ${name}! You are ${age} years old.`;

export const isAdult = ({ age }: User) => age >= 18;

getLogger().info(greeting({ name: 'Deno', age: 2 }));
