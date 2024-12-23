"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get registered users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Validate the credentials
        const validUser = users.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (validUser) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            alert("Login successful!");
            router.push("/"); // Redirect to home page
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
