import { Card, CardActionArea, IconButton } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuthCtx from '../hooks/useAuthCtx';
import useRefresh from '../hooks/useRefresh';

function Todo({todo, setIsCreatingTodo, setFromTodo, setTodo, setStatus}: {todo: Todo, setIsCreatingTodo: Dispatch<SetStateAction<boolean>>, setFromTodo: Dispatch<SetStateAction<boolean>>, setTodo:  Dispatch<SetStateAction<Todo | null>>, setStatus: Dispatch<SetStateAction<number | null>>}) {
  async function setTodoDone() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.accessToken}`
      },
      body: JSON.stringify({todoID: todo?._id, todo: todo.todo, done: !todo?.done})
    });

    if(res?.status === 400) {
      setStatus(400);
    }
    else if(res?.status === 500) {
      setStatus(500);
    }
    else if(res?.status === 403) {
      setStatus(403);
      refresh();
    }
    else if(res?.status === 200) {
      setStatus(200);
    }
  }

  async function deleteTodo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.accessToken}`
      },
      body: JSON.stringify({todoID: todo?._id})
    });

    if(res?.status === 400) {
      setStatus(400);
    }
    else if(res?.status === 500) {
      setStatus(500);
    }
    else if(res?.status === 403) {
      setStatus(403);
      refresh();
    }
    else if(res?.status === 200) {
      setStatus(200);
    }
  }

  const color = todo.done ? 'green' : 'gray';
  const { auth } = useAuthCtx();
  const refresh = useRefresh();

  return (
    <Card
      sx={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify'
      }}
      elevation={5}
    >
      <CardActionArea
        sx={{
          padding: '1rem'
        }}
        onClick={() => {
          setIsCreatingTodo(true);
          setFromTodo(true);
          setTodo(todo);
        }}
      >
        {todo.todo}
      </CardActionArea>
      <IconButton
        sx={{
          color: color,
          marginLeft: '1rem'
        }}
        onClick={setTodoDone}
      >
        {todo.done ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
      </IconButton>
      <IconButton
        color='error'
        onClick={deleteTodo}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  )
}

export default Todo