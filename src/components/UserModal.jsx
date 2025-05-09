import React from "react";

const UserModal = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 shadow-lg relative w-96">
        <button className="absolute top-2 right-2 text-xl text-black font-bold" onClick={onClose}>
         X
        </button>
        <p className="text-center text-gray-700">No user logged in.</p>
      </div>
    </div>
  );

  // Function to handle logout
  const handleLogout = () => {
    // Clear the current user from localStorage
    localStorage.setItem("currentUser", JSON.stringify(null));
    // Optionally, close the modal after logout
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 shadow-lg relative w-96">
        <button
          className="absolute top-2 right-2 text-xl font-bold text-black"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png" // use a default avatar or generate random
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-black">{user.username || "User"}</h2>
          <p className="text-gray-600">{user.email}</p>
          {/* Log out button */}
          <button
            onClick={handleLogout}
            className="mt-4 text-red-500 font-semibold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
