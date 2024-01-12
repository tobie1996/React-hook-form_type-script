
import React from 'react';
import './App.css';
import { z, ZodType } from "zod";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

function App() {


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

const schema: ZodType<FormData> = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email(),
  age: z.number().min(18),
  password: z.string().min(6).max(30),
  confirmPassword: z.string().min(6).max(30),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const { register, handleSubmit, formState: {errors}} = useForm <FormData> ({resolver:zodResolver(schema)});

const submitData = (data:FormData) =>  {
  console.log("IT WORKED", data)
  localStorage.setItem("formValues", JSON.stringify(data));

}

// pour effacer les champs du formulaire



const initialFormState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  age:0,
  password: '',
  confirmPassword: '',
};

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(submitData)}> 
        <label htmlFor="firstName">FirstName</label>
        <input type="text" {...register("firstName")} id="firstName" />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        
        <label htmlFor="lastName" >LastName</label>
        <input type="text" {...register("lastName")} id="lastName" />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} id="email" />
        {errors.email && <span>{errors.email.message}</span>}

        
        <label htmlFor="age">Age</label>
        <input type="number" id="age" {...register("age",{ valueAsNumber:true})} />
        {errors.age && <span>{errors.age.message}</span>}

        
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")}/>
        {errors.password && <span>{errors.password.message}</span>}

        
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" {...register("confirmPassword")} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;

