import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    // Fetch user data from storage or API (replace with your logic)
    const storedUser = localStorage.getItem("user"); // Replace with appropriate storage
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []); // Run only on initial render

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with appropriate token storage mechanism
        }
      });
  
      if (response.ok) {
        // Logout successful
        localStorage.removeItem('token'); // Clear stored token
        navigate('/login'); // Redirect to login page
      } else {
        console.error('Logout failed:', response.statusText);
        // Handle logout errors (optional: display error message)
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Handle network or other errors (optional: display error message)
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      {userData ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {userData.name}!</h1>
          <p className="text-gray-700 mb-8">This is your dashboard.</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-gray-700">You are not logged in.</p>
      )}
    </div>
  );
};
