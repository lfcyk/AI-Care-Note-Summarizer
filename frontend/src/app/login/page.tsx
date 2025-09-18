"use client";

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('family');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // Simulate login
    alert(`Login submitted!\nRole: ${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-4">
          {/* Heart Icon SVG */}
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21s-6.716-5.373-9.293-8.293A5.978 5.978 0 0 1 2 8.5C2 5.462 4.462 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.538 3 22 5.462 22 8.5c0 1.61-.613 3.117-1.707 4.207C18.716 15.627 12 21 12 21z" fill="#EF4444"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label htmlFor="role" className="block mb-1 font-medium">Role</label>
          <select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="family">Family</option>
            <option value="caregiver">Caregiver</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
