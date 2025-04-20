import React, { useState } from 'react';
import axios from 'axios';
import { getUserID } from '../sign-in/auth';

const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const userId = getUserID();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        // Clear the error message if passwords match
        setError(null);

        try {
            const response = await axios.put("http://localhost:7000/singup/change-password", {
                userId,currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                // Simulate successful password change
                setSuccess('Password changed successfully!');
            } else {
                throw new Error('Failed to change password');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="currentPassword">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        required
                    />
                </div>
                {error && <p className="text-red-600 text-lg mb-4">{error}</p>}
                {success && <p className="text-green-600 text-lg mb-4">{success}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
