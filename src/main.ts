export interface User {
  name: string;
  age: number;
}

export const greeting = ({ name, age }: User) => `Hello, ${name}! You are ${age} years old.`;

export const isAdult = ({ age }: User) => age >= 18;
