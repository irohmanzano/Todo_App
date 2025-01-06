import { Box, Button, TextField, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useState, FormEvent, useEffect } from 'react'
import useAuthCtx from '../hooks/useAuthCtx';
import useRefresh from '../hooks/useRefresh';
import { Preview } from '@mui/icons-material';

function EditTodo({setIsCreatingTodo, fromTodo, setFromTodo, todo, setStatus, setTodos}: {setIsCreatingTodo: Dispatch<SetStateAction<boolean>>, fromTodo: boolean, setFromTodo: Dispatch<SetStateAction<boolean>>, todo: Todo | null, setStatus: Dispatch<SetStateAction<number | null>>, setTodos: Dispatch<SetStateAction<Todo[]>>}) {
  async function submitTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let res;
    if(!fromTodo) {
      res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`
        },
        body: JSON.stringify({userID: auth?.userID, todo: formData.todo})
      });
    }
    else if(fromTodo) {
      res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`
        },
        body: JSON.stringify({todoID: todo?._id, todo: formData.todo, done: todo?.done})
      });
    }

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
      setFromTodo(false);
      setFormData({todo: ''});
      setIsCreatingTodo(false);
    }
    else if(res?.status === 201) {
      setStatus(201);
      setFormData({todo: ''});
      setIsCreatingTodo(false);
    }
  }

  let [formData, setFormData] = useState({todo: ''});
  const { auth } = useAuthCtx();
  const refresh = useRefresh();

  useEffect(() => {
    if(fromTodo) {
      setFormData({todo: todo?.todo || ''});
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        left: 0,
        right: 0,
        top: '2.5rem',
        bottom: '0',
        paddingBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className='w-[60vw] bg-white p-2 rounded-lg'
      >
        <Typography
          variant='h4'
          component='h1'
          sx={theme => ({
            textAlign: 'center',
            fontWeight: 'medium',
            color: theme.palette.primary.main
          })}
        >
          Create Todo
        </Typography>
        <form
          onSubmit={(e) => submitTodo(e)}
        >
          <TextField
            multiline
            required
            rows={8}
            sx={{
              width: '100%',
            }}
            placeholder='Write something...'
            name='todo'
            value={formData.todo}
            onChange={(e) => {
              const target = e.target;
              const name = target.name;
              setFormData(prev => ({
                ...prev,
                [name]: target.value
              }));
            }}
          />
          <div
            className='flex justify-end mt-2 gap-2'
          >
            <Button
              variant='contained'
              type='submit'
            >
              Save
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => {
                setIsCreatingTodo(prev => !prev);
                setFormData({todo: ''});
                setFromTodo(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Box>
  )
}

export default EditTodo