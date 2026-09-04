import { httpClient } from '../app/lib/http/axios';
import type { User } from '../features/auth/types/auth.type';

type UserResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
// export async function getUsers(): Promise<UserResponse> {
//   const response = await httpClient.get<UserResponse>('/users');
//   return response.data;
// }
export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await httpClient.get<UserResponse>('/users');
    return response.data.users;
  },
};
