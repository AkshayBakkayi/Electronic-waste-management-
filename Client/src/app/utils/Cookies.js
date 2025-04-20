import { useState } from 'react';
import Cookies from 'js-cookie';

const defaultUser = {
    fullName: '',
    email: '',
    phonenumber: '',
   
};

export const useUserData = () => {
    const [user, setUser] = useState(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            return JSON.parse(userData);
        }
        return defaultUser;
    });

    const updateUserData = (newUserData) => {
        setUser(newUserData);
        Cookies.set('userData', JSON.stringify(newUserData));
    };

    return { user, updateUserData };
};
