import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
      <div className="space-x-4">
        <Link to="/signin" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Sign In
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
