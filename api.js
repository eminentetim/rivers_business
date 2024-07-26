const API_URL = 'http://159.65.82.71/api';

export const fetchAuthData = async () => {
    const response = await fetch(`${API_URL}/auth`);
    return response.json();
};

export const fetchIndexData = async () => {
    const response = await fetch(`${API_URL}/`);
    return response.json();
};

export const fetchAdminData = async () => {
    const response = await fetch(`${API_URL}/admin`);
    return response.json();
};

export const fetchStudentData = async () => {
    const response = await fetch(`${API_URL}/student`);
    return response.json();
};

export const fetchApplicationData = async () => {
    const response = await fetch(`${API_URL}/application`);
    return response.json();
};

export const fetchPaymentData = async () => {
    const response = await fetch(`${API_URL}/payment`);
    return response.json();
};

export const fetchNotificationsData = async () => {
    const response = await fetch(`${API_URL}/notifications`);
    return response.json();
};

