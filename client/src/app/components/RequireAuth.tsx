import React, { useEffect, useState } from 'react'
import useAuthCtx from '../hooks/useAuthCtx'
import { usePathname, useRouter } from 'next/navigation';

function RequireAuth({children}: Readonly<{children: React.ReactNode}>) {
  const { auth } = useAuthCtx();
  const router = useRouter();
  const pathname = usePathname();
  const [ isAuthorized, setIsAuthorized ] = useState(false);

  useEffect(() => {
    if(!auth?.userID && !auth?.accessToken && pathname !== '/login') {
      router.push('/login');
    }
    else {
      setIsAuthorized(true);
    }
  }, [auth, router]);

  if(!isAuthorized && pathname !== '/login') {
    return null;
  }

  return children;
}

export default RequireAuth