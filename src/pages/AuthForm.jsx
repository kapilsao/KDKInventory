


// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// // Zod schema for form validation
// const signInSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
// });

// const signUpSchema = signInSchema.extend({
//   name: z.string().min(2, { message: "Name must be at least 2 characters" }),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// export default function AuthForm() {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
//   });

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     console.log(data);
//     setIsLoading(false);
//     reset();
//   };

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//     reset();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl"
//       >
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             {isSignUp ? "Create an account" : "Sign in to your account"}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {isSignUp && (
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input 
//                 id="name" 
//                 {...register("name")} 
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
//               />
//               {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
//             </div>
//           )}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
//             <input 
//               id="email" 
//               type="email" 
//               {...register("email")} 
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
//             />
//             {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input 
//               id="password" 
//               type="password" 
//               {...register("password")} 
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
//             />
//             {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
//           </div>
//           {isSignUp && (
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <input 
//                 id="confirmPassword" 
//                 type="password" 
//                 {...register("confirmPassword")} 
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
//               />
//               {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
//             </div>
//           )}
//           <div>
//             <button 
//               type="submit" 
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               disabled={isLoading}





import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast'

// Zod schema for validation
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role:z.string()
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthForm({ isSignUp }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(isSignUpPage ? signUpSchema : signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isSignUpPage) {
        console.log(data);
        // API call for sign-up
        const response = await axios.post('http://127.0.0.1:5000/auth/signup', data);
        console.log('Sign-Up Success:', response.data);
        navigate('/signin');
      } else {
        // API call for sign-in
        console.log(data);
        const response = await axios.post('http://127.0.0.1:5000/auth/login', data);
        localStorage.setItem('userid',response.data.user.id);
        localStorage.setItem("userData",JSON.stringify(response.data.user.role));
        localStorage.setItem("userName",JSON.stringify(response.data.user.name));
        console.log('Sign-In Success:', response.data.user);
        navigate('/main');
      }
      // Redirect to another page (e.g., dashboard)
       // Change '/dashboard' to your desired route
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data)
    }
  };


  const toggleMode = () => {
    navigate(isSignUpPage ? '/signin' : '/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center">
          {isSignUpPage ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignUpPage && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full mt-1 p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

            { !isSignUpPage && <div>
               <label className="block text-sm font-medium">Role</label>
               <select
                   {...register('role')}  // Register the select field with form validation
                   className="w-full mt-1 p-2 border rounded"
                >
                    <option value="">Select a role</option>
                     <option value="admin">Admin</option>
                     <option value="manager">Manager</option>
                      <option value="faculty">Faculty</option>
                 </select>
 
          </div>}

         
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full mt-1 p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {isSignUpPage && (
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {isSignUpPage ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          className="text-indigo-500 underline w-full text-center mt-4"
          onClick={toggleMode}
        >
          {isSignUpPage ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
