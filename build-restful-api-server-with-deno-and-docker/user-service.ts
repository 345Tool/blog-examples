/**
 * Sample code for 345Tool.com blog
 * @license MIT
 * License: https://github.com/345Tool/blog-examples/LICENSE
 */
export interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Emily" },
  { id: 3, name: "Kevin" },
];

export const listUsers = (): User[] => {
  return users;
};

export const addUser = (user: User): void => {
  users.push(user);
};
