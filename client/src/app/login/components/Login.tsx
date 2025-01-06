import { resetFormData } from '@/lib/formFns';
import { Button, TextField } from "@mui/material";
import { updateLoginRegFormData } from '@/lib/formFns';

function Login({ setRenderComp, formData, setFormData }: PropsLoginReg) {
  return (
    <>
      <TextField
        placeholder="Username"
        name="username"
        onChange={(e) => updateLoginRegFormData(setFormData, e)}
        value={formData.username}
        required
      />
      <TextField
        placeholder="Password"
        type="password"
        name="password"
        onChange={(e) => updateLoginRegFormData(setFormData, e)}
        value={formData.password}
        required
      />
      <Button
        variant="contained"
        sx={{
          marginTop: '34px'
        }}
        type="submit"
      >
        Log in
      </Button>
      <Button
        sx={{
          marginTop: '0.5rem'
        }}
        onClick={() => {
          setRenderComp('register');
          resetFormData(setFormData);
        }}
      >
        Register
      </Button>
    </>
  )
}

export default Login;