type AuthContext = {
  auth: Auth | null,
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>
};

type Auth = {
  userID: string,
  username: string,
  accessToken: string
};

type FormDataLoginReg = {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  cPassword: string,
};

type PropsLoginReg = {
  setRenderComp: Dispatch<SetStateAction<string>>,
  formData: formData,
  setFormData: Dispatch<SetStateAction<FormDataLoginReg>>,
};

type Todo = {
  _id: string,
  userID: string,
  todo: string,
  done: boolean
};