import { resetFormData } from '@/lib/formFns';
import { Button, TextField } from "@mui/material";
import { updateLoginRegFormData } from '@/lib/formFns';

function Register({ setRenderComp, formData, setFormData }: PropsLoginReg) {
  return (
    <>
      <TextField
        placeholder="First name"
        name="firstName"
        onChange={(e) => updateLoginRegFormData(setFormData, e)}
        value={formData.firstName}
        required
      />
      <TextField
        placeholder="Last name"
        name="lastName"
        onChange={(e) => updateLoginRegFormData(setFormData, e)}
        value={formData.lastName}
        required
      />
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
      <TextField
        placeholder="Confirm password"
        type="password"
        name="cPassword"
        onChange={(e) => updateLoginRegFormData(setFormData, e)}
        value={formData.cPassword}
        required
      />
      <Button
        variant="contained"
        sx={{
          marginTop: '34px'
        }}
        type="submit"
      >
        Register
      </Button>
      <Button
        sx={{
          marginTop: '0.5rem'
        }}
        onClick={() => {
          setRenderComp('login');
          resetFormData(setFormData);
        }}
      >
        Log in
      </Button>
    </>
  )
}

export default Register