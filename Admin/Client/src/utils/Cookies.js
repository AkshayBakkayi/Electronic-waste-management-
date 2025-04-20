import { useState } from 'react';
import Cookies from 'js-cookie';

// Default data objects for each type
const defaultStudentData = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    address: '',
    dateOfBirth: '',
};

const defaultAdminData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    gender: '',
    password: '',
};


const defaultOrgData = {
    organizationName: '',
    orgCode: '',
    personName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    phone: ''
};


const defaultCollege = {
    name: '',
    email: '',
    address: '',
    password: ''
};

const defaultEvaluator = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    address: '',
    gender: '',
    password: '',
    dateOfBirth: '',
    approved: ''
};


const defaultUniversity = {
    name: '',
    email: '',
    address: '',
    password: ''
};


// Custom hook to manage student data
export const useStudentData = () => {
    const [student, setStudent] = useState(() => {
        const studentData = Cookies.get('studentData');
        if (studentData) {
            return JSON.parse(studentData);
        }
        return defaultStudentData;
    });

    const updateStudentData = (newStudentData) => {
        setStudent(newStudentData);
        Cookies.set('studentData', JSON.stringify(newStudentData));
    };

    return { student, updateStudentData };
};


export const useAdminData = () => {
    const [admin, setAdmin] = useState(() => {
        const studentData = Cookies.get('adminData');
        if (studentData) {
            return JSON.parse(studentData);
        }
        return defaultAdminData;
    });

    const updateStudentData = (newStudentData) => {
        setAdmin(newStudentData);
        Cookies.set('adminData', JSON.stringify(newStudentData));
    };

    return { admin, updateStudentData };
};



export const useOrgData = () => {
    const [org, setOrg] = useState(() => {
        const studentData = Cookies.get('organizationData');
        if (studentData) {
            return JSON.parse(studentData);
        }
        return defaultOrgData;
    });

    const updateStudentData = (newStudentData) => {
        setOrg(newStudentData);
        Cookies.set('organizationData', JSON.stringify(newStudentData));
    };

    return { org, updateStudentData };
};









// Custom hook to manage user data
export const useUserData = () => {
    const [user, setUser] = useState(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            return JSON.parse(userData);
        }
        return defaultStudentData;
    });

    const updateUserData = (newUserData) => {
        setUser(newUserData);
        Cookies.set('userData', JSON.stringify(newUserData));
    };

    return { user, updateUserData };
};

// Custom hook to manage tech expert data
export const useTechExpertData = () => {
    const [techExpert, setTechExpert] = useState(() => {
        const techExpertData = Cookies.get('techExpertData');
        if (techExpertData) {
            return JSON.parse(techExpertData);
        }
        return defaultAdminData;
    });

    const updateTechExpertData = (newTechExpertData) => {
        setTechExpert(newTechExpertData);
        Cookies.set('techExpertData', JSON.stringify(newTechExpertData));
    };

    return { techExpert, updateTechExpertData };
};

// Custom hook to manage college data
export const useCollegeData = () => {
    const [college, setCollege] = useState(() => {
        const collegeData = Cookies.get('collegeData');
        if (collegeData) {
            return JSON.parse(collegeData);
        }
        return defaultCollege;
    });

    const updateCollegeData = (newCollegeData) => {
        setCollege(newCollegeData);
        Cookies.set('collegeData', JSON.stringify(newCollegeData));
    };

    return { college, updateCollegeData };
};

// Custom hook to manage evaluator data
export const useEvaluatorData = () => {
    const [evaluator, setEvaluator] = useState(() => {
        const evaluatorData = Cookies.get('evaluatorData');
        if (evaluatorData) {
            return JSON.parse(evaluatorData);
        }
        return defaultEvaluator;
    });

    const updateEvaluatorData = (newEvaluatorData) => {
        setEvaluator(newEvaluatorData);
        Cookies.set('evaluatorData', JSON.stringify(newEvaluatorData));
    };

    return { evaluator, updateEvaluatorData };
};



// Custom hook to manage university data
export const useUniversityData = () => {
    const [university, setUniversity] = useState(() => {
        const universityData = Cookies.get('universityData');
        if (universityData) {
            return JSON.parse(universityData);
        }
        return defaultUniversity;
    });

    const updateUniversityData = (newUniversityData) => {
        setUniversity(newUniversityData);
        Cookies.set('universityData', JSON.stringify(newUniversityData));
    };

    return { university, updateUniversityData };
};
