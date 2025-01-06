'use client'

import { useContext } from 'react'
import AuthCtx from '../context/AuthContextProvider';

function useAuthCtx() {
  const authContext = useContext(AuthCtx);
  if(!authContext) throw new Error('No context');
  return authContext;
}

export default useAuthCtx