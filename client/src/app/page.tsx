'use client'

import { Container, IconButton, ThemeProvider, Typography } from "@mui/material";
import Header from "./components/Header";
import theme from './theme/theme'
import { useEffect, useRef, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditTodo from "./components/EditTodo";
import useAuthCtx from "./hooks/useAuthCtx";
import useRefresh from "./hooks/useRefresh";
import GenError from "./components/GenError";
import Todo from "./components/Todo";
import Masonry from '@mui/lab/Masonry';
import {v4 as uuid} from 'uuid';

export default function Home() {
  let [isCreatingTodo, setIsCreatingTodo] = useState(false);
  let [fromTodo, setFromTodo] = useState(false);
  let [todos, setTodos] = useState<Todo[]>([]);
  let [todo, setTodo] = useState<Todo | null>(null);
  let [status, setStatus] = useState<number | null>(null);
  const { auth } = useAuthCtx();
  const refresh = useRefresh();
  const renderTodos = todos?.map(todo => (
    <Todo key={uuid()} todo={todo} setIsCreatingTodo={setIsCreatingTodo} setFromTodo={setFromTodo} setTodo={setTodo} setStatus={setStatus} />
  ));

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${auth?.userID}`, {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`
        }
      });

      if(res.status === 400) {
        setStatus(400);
      }
      else if(res.status === 500) {
        setStatus(500);
      }
      else if(res.status === 403) {
        setStatus(403);
        refresh();
      }
      else if(res.status === 200) {
        const data = await res.json();
        setTodos(data);
      }
    }

    fetchTodos();
  }, [status]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Container
          sx={{
            display: 'relative'
          }}
        >
          {
            status === 400
            ? <GenError msg={'No data sent to server'} setStatus={setStatus} />
            : status === 500
            ? <GenError msg={'Server error'} setStatus={setStatus} />
            : status === 403
            ? <GenError msg={'Token expired. Please try again.'} setStatus={setStatus} />
            : status === 201 || status === 200
            ?  <GenError msg={'Todo successfully saved'} setStatus={setStatus} />
            : null
          }
          <IconButton
            disableRipple
            color="primary"
            sx={{
              fontSize: '46px',
            }}
            onClick={() => setIsCreatingTodo(prev => !prev)}
          >
            <AddCircleIcon
              fontSize="inherit"
              sx={{
                position: 'fixed',
                right: '4rem',
                bottom: '2rem'
              }}
            />
          </IconButton>
          {
            renderTodos 
            && <Masonry
              columns={4}
              spacing={2}
            >
              {renderTodos}
            </Masonry>
          }
          {
            renderTodos.length <= 0
            && <div
            className="flex justify-center items-center"
            >
              <Typography
                variant='h6'
                component='h1'
                sx={theme => ({
                  color: theme.palette.secondary.dark
                })}
              >
                {"Nothing to do for now :)"}
              </Typography>
            </div>
          }
          {isCreatingTodo && <EditTodo setIsCreatingTodo={setIsCreatingTodo} fromTodo={fromTodo} setFromTodo={setFromTodo} todo={todo} setStatus={setStatus} setTodos={setTodos}/>}
        </Container>
      </ThemeProvider>
    </>
  );
}