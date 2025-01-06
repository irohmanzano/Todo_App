function Error({ msg }: {msg: string}) {
  const bgColor = msg === 'Registered successfully.' ? 'bg-green-400' : 'bg-red-500';
  return (
    <div
      className={`${bgColor} text-white text-sm p-1 w-48 flex items-center break-normal`}
    >
      {msg}
    </div>
  )
}

export default Error