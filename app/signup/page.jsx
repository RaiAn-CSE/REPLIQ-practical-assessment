"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get existing users from localStorage or initialize an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the email is already registered
        const isRegistered = users.some((user) => user.email === formData.email);
        if (isRegistered) {
            alert("Email already registered. Please log in.");
            router.push("/login");
            return;
        }

        // Add the new user to the array and save it in localStorage
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! You can now log in.");
        router.push("/login"); // Redirect to login page
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
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
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
