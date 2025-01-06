import { useEffect, useState, Dispatch, SetStateAction } from 'react'

function GenError({msg, setStatus}: {msg: string, setStatus:  Dispatch<SetStateAction<number | null>>}) {
  let [ display, setDisplay ] = useState('block');
  const color = msg !== 'Todo successfully saved' ? 'bg-red-500' : 'bg-green-500';

  useEffect(() => {
    async function hideError() {
      const interval = setInterval(() => {
        setDisplay('hidden');
        setStatus(null);
      }, 5000);
    }

    hideError();
  }, []);

  return (
    <div
      className={`fixed bottom-3 left-12 ${color} text-white p-1 text-sm px-4 rounded-sm ${display}`}
    >{msg}
    </div>
  )
}

export default GenError