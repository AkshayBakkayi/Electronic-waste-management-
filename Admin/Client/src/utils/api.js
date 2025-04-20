const API_URL = 'http://localhost:8000';

const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const url = `${API_URL}${endpoint}`;
    const options = { method };

    if (data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
        if (!(data instanceof FormData)) {
            options.headers = { 'Content-Type': 'application/json' };
        }
    }

    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        throw new Error(`An error occurred while processing your request : ${error}`);
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

export const userForgotPassword = (email) => {
    return apiRequest(`/user/forgotPassword/${email}`, 'PUT');
}


export const applyForScholarship = (data) => {
    return apiRequest('/application/apply', 'POST', data);
}

export const getApplicationsByStudent = (student) => {
    return apiRequest(`/application/findByStudent/${student}`, 'GET');
}

export const getApplications = () => {
    return apiRequest('/application/', 'GET');
}

export const getApplicationsByOrg = (id) => {
    return apiRequest(`/application/findByOrg/${id}`, 'GET');
}

export const scholorshipApprovalByAdmin = (id) => {
    return apiRequest(`/application/adminApproval/${id}`, "PUT");
}

export const scholorshipRejectionByAdmin = (id, data) => {
    return apiRequest(`/application/adminRejection/${id}`, "PUT", data);
}

export const scholorshipApprovalByOrg = (id, data) => {
    return apiRequest(`/application/organizationApproval/${id}`, "PUT", data);
}

export const scholorshipRejectionByOrg = (id, data) => {
    return apiRequest(`/application/organizationRejection/${id}`, "PUT", data);
}

// -----------------------------------------Start Of Organisation---------------------------------------

export const organizationSignUp = (signupData) => {
    return apiRequest('/organiztion/create', 'POST',
        signupData);
};

export const organiztionLogin = (loginData) => {
    return apiRequest('/organiztion/login', 'POST', loginData);
};

export const getOrganiztions = () => {
    return apiRequest('/organiztion', 'GET');
}

export const getOrganiztionById = (id) => {
    return apiRequest(`/organiztion/${id}`, 'GET');
}

export const updateOrganiztion = (id, userData) => {
    return apiRequest(`/organiztion/updateById/${id}`, 'PUT', userData);
}

export const changeOrganiztionPassword = (id, changeUserPasswordData) => {
    return apiRequest(`/organiztion/changePassword/${id}`, 'PUT', changeUserPasswordData);
}

export const organiztionForgotPassword = (email) => {
    return apiRequest(`/organiztion/forgotPassword/${email}`, 'PUT');
}


// -----------------------------------------Start Of Organisation---------------------------------------







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

export const updateNotificationById = (id, updateNotificationData) => {
    return apiRequest(`/notification/updateNotificationById/${id}`, 'PUT', updateNotificationData);
}

export const deleteNotificationById = (id) => {
    return apiRequest(`/notification/deleteNotificationById/${id}`, 'DELETE')
}

export const adminLogin = (data) => {
    return apiRequest(`/admin/login/`, 'POST', data);
}

export const adminForgotPassword = (email) => {
    return apiRequest(`/admin/forgotPassword/${email}`, 'PUT');
}


export const createScholorship = (categoryData) => {
    return apiRequest('/scholorship/createCategory', 'POST', categoryData);
}

export const getAllScholorships = () => {
    return apiRequest('/scholorship', 'GET');
}
export const getUsercount = () => {
    return apiRequest('/signup/Usercount', 'GET');
}


export const getScholorshipById = (id) => {
    return apiRequest(`/scholorship/getScholorshipById/${id}`, 'GET');
}
export const updateScholorshipById = (id, updateCategoryData) => {
    return apiRequest(`/scholorship/updateCategoryById/${id}`, 'PUT', updateCategoryData);
}

export const deleteScholorshipById = (id) => {
    return apiRequest(`/scholorship/deleteCategoryById/${id}`, 'DELETE')
}