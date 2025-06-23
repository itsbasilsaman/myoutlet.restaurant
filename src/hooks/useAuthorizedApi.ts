import { useMemo } from 'react';
import { authorizedApi } from '@/lib/authorizeApi';

export const useAuthorizedApi = () => {
  return useMemo(() => authorizedApi(), []);
};