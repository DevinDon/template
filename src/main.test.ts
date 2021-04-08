import { assertEquals } from 'https://deno.land/std@0.92.0/testing/asserts.ts';
import { User, greeting, isAdult } from './main.ts';

const user1: User = { name: 'Test User', age: 17 };
const user2: User = { name: 'Fake User', age: 27 };

Deno.test('Greeting should return name and age', () => {
  assertEquals(greeting(user1), `Hello, ${user1.name}! You are ${user1.age} years old.`);
  assertEquals(greeting(user2), `Hello, ${user2.name}! You are ${user2.age} years old.`);
});

Deno.test('IsAdult should return true of false', () => {
  assertEquals(isAdult(user1), false);
  assertEquals(isAdult(user2), true);
});
