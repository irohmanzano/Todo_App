import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

export function updateLoginRegFormData(stateUpdater: Dispatch<SetStateAction<FormDataLoginReg>>, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const target = e.target;
  const name = target.name;
  stateUpdater(prev => ({
    ...prev,
    [name]: target.value
  }));
};

export function resetFormData(stateUpdater: Dispatch<SetStateAction<FormDataLoginReg>>) {
  stateUpdater({firstName: '', lastName: '', username: '', password: '', cPassword: ''});
}

export async function submitLoginRegForm(formData: FormDataLoginReg, renderComp: string, setErrors: Dispatch<SetStateAction<string[]>>, setAuth: React.Dispatch<React.SetStateAction<Auth | null>>, router: ReturnType<typeof useRouter>) {
  setErrors([]);
  if(renderComp === 'register') {
    if(formData.password !== formData.cPassword) {
      return setErrors(prev => ([...prev, 'Passwords do not match. Please confirm password.']));
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({firstName: formData.firstName, lastName: formData.lastName, username: formData.username, password: formData.password})
    });
    if(res.status === 400) {
      setErrors(prev => [...prev, 'Please enter user information.']);
    }
    else if(res.status === 409) {
      setErrors(prev => [...prev, 'Username already taken.']);
    }
    else if(res.status === 500) {
      setErrors(prev => [...prev, 'Server error']);
    }
    else if(res.status === 201) {
      setErrors(['Registered successfully.']);
    }
  }

  if(renderComp === 'login') {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({username: formData.username, password: formData.password})
    });
    if(res.status === 400 || res.status === 401) {
      setErrors(prev => [...prev, 'No user found.']);
    }
    else if(res.status === 500) {
      setErrors(prev => [...prev, 'Server error']);
    }
    else if(res.status === 200) {
      const data = await res.json();
      setAuth(data);
      router.replace('/');
    }
  }
}