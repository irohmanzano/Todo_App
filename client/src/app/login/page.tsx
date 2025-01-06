'use client'

import { useEffect, useState } from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { submitLoginRegForm } from '@/lib/formFns'
import {v4 as uuid} from "uuid";
import Error from "../components/Error";
import theme from '../theme/theme';
import Login from "./components/Login";
import Register from "./components/Register";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import useAuthCtx from "../hooks/useAuthCtx";

export default function Home() {
  const { setAuth } = useAuthCtx();
  const router = useRouter();
  let [ renderComp, setRenderComp ] = useState('login');
  let [ formData, setFormData ] = useState({firstName: '', lastName: '', username: '', password: '', cPassword: ''});
  let [errors, setErrors] = useState<string[]>([]);

  const StyledHeader = styled(Typography)(() => ({
    fontWeight: 'bold',
    fontSize: '3rem'
  }));

  useEffect(() => {
    setErrors([]);
  }, [renderComp]);

  return (
    <main
      className="flex justify-center items-center h-screen"
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            border: '4px solid transparent',
            borderImage: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark}) 1`,
            backgroundColor: theme.palette.background.default,
            paddingInline: '60px',
            paddingBlock: '20px',
            boxShadow: '4px 2px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              submitLoginRegForm(formData, renderComp, setErrors, setAuth, router);
            }}
          >
            <StyledHeader color="primary">{renderComp.charAt(0).toUpperCase() + renderComp.slice(1)}</StyledHeader>
            {errors.map(err => (<Error key={uuid()} msg={err}/>))}
            { renderComp === 'login'
              ? <Login
                setRenderComp={setRenderComp}
                formData={formData}
                setFormData={setFormData}
                />
              : <Register
                setRenderComp={setRenderComp}
                formData={formData} 
                setFormData={setFormData}
                />
            }
          </form>
        </Box>
      </ThemeProvider>
    </main>
  );
}