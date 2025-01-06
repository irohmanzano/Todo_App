import useAuthCtx from './useAuthCtx'

function useRefresh() {
  async function refresh() {
    const { setAuth } = useAuthCtx();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refresh`, {
      method: 'GET',
      credentials: 'include'
    });

    if(res.status === 200) {
      const data = await res.json();
      setAuth(data);
      return data.accessToken;
    }
  }
  return refresh;
}

export default useRefresh