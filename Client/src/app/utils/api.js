const API_URL = 'http://localhost:7000';

const apiRequest = async (endpoint, method = 'GET', data = null) => {
        const url = `${API_URL}${endpoint}`;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        console.log("Entered")

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {

            const response = await fetch(url, options);

            return response;
        } catch (error) {
            throw new Error('An error occurred while processing your request');
        }
    };

export const signUp = (signupData) => {
    return apiRequest('/user/createUser', 'POST',
        signupData);
};





export const login = (loginData) => {
    return apiRequest('/user/login', 'POST', loginData);
};

export const getUsers = () => {
    return apiRequest('/user', 'GET');
}

export const getUserById = (id) => {
    return apiRequest(`/user/${id}`, 'GET');
}

export const updateUser = (id, userData) => {
    return apiRequest(`/user/updateById/${id}`, 'PUT', userData);
}

export const changeUserPassword = (id, changeUserPasswordData) => {
    return apiRequest(`/user/changePassword/${id}`, 'PUT', changeUserPasswordData);
}

export const createCategory = (categoryData) => {
    return apiRequest('/category/createCategory', 'POST', categoryData);
}

export const getAllCategories = () => {
    return apiRequest('/category', 'GET');
}

export const updateCategoryById = (id, updateCategoryData) => {
    return apiRequest(`/category/updateCategoryById/${id}`, 'PUT', updateCategoryData);
}

export const deleteCategoryById = (id) => {
    return apiRequest(`/category/deleteCategoryById/${id}`, 'DELETE')
}

export const createSubcategory = (subcategoryData) => {
    return apiRequest('/subcategory/createSubcategory', 'POST', subcategoryData);
}

export const deleteSubcategoryById = () => {
    return apiRequest('/subcategory', 'GET');
}

export const getAllSubcategories = (id, updateSubcategoryData) => {
    return apiRequest(`/subcategory/updateSubcategoryById/${id}`, 'PUT', updateSubcategoryData);
}

export const updateSubcategoryById = (id) => {
    return apiRequest(`/subcategory/deleteSubcategoryById/${id}`, 'DELETE')
}


export const createNotification = (notificationData) => {
    return apiRequest('/notification/createNotification', 'POST', notificationData);
}

export const getAllNotifications = () => {
    return apiRequest('/notification', 'GET');
}
export const getERequestByUserId = (userId) => {
    return apiRequest(`/request/${userId}`, 'GET');
}

export const updateNotificationById = (id, updateNotificationData) => {
    return apiRequest(`/notification/updateNotificationById/${id}`, 'PUT', updateNotificationData);
}

export const deleteNotificationById = (id) => {
    return apiRequest(`/notification/deleteNotificationById/${id}`, 'DELETE')
}
