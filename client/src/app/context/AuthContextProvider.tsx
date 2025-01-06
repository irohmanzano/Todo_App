'use client'

import React, { createContext, useState } from 'react'

const AuthCtx = createContext<AuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: Readonly<{children: React.ReactNode}>) {
  const [ auth, setAuth ] = useState<Auth | null>(null);

  return (
    <AuthCtx.Provider
      value={{auth, setAuth}}
    >
      {children}
    </AuthCtx.Provider>
  )
}

export default AuthCtx;