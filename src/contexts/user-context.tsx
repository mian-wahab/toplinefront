'use client';

import * as React from 'react';

import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { ToastType } from './enums';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  setUser?: (user: User) => void;
  toast: { toast: { isOpen: boolean; message: string | null; type: ToastType }; setToast: React.Dispatch<React.SetStateAction<{ isOpen: boolean; message: string | null; type: ToastType }>> };
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

let responseToast;
export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [toast, setToast] = React.useState<{ isOpen: boolean; message: string | null; type: ToastType }>({
    isOpen: false,
    message: '',
    type: ToastType.INFO,
  });

  responseToast = { toast, setToast } as { toast: { isOpen: boolean; message: string | null; type: ToastType }; setToast: React.Dispatch<React.SetStateAction<{ isOpen: boolean; message: string | null; type: ToastType }>> };;

  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const setUser = (user: User) => {
    setState((prev) => ({ ...prev, user }));
  }

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }
      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession, setUser, toast:{toast, setToast} }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;

export { responseToast };

