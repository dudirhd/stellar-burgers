import { TUser } from '@utils-types';

export interface IAuthState {
  isAuthed: boolean;
  isLoading: boolean;
  user: TUser | null;
}
