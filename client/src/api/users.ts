import { User } from '@acme/shared-models';
import { TFetchResult } from './types';
import { handleException } from './utils';

const USER_API = '/api/users';

export async function fetchUsers(): TFetchResult<User[]> {
  try {
    const data = await fetch(USER_API);
    return { data: await data.json(), error: null };
  } catch (error) {
    handleException(error);
    return { data: [], error };
  }
}

export async function fetchUser(id: User['id']): TFetchResult<User> {
  try {
    const data = await fetch(`${USER_API}/${id}`);
    return { data: await data.json(), error: null };
  } catch (error) {
    handleException(error);
    return { data: null, error };
  }
}
