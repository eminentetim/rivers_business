const fetch = require('node-fetch');

const API_URL = 'https://rivers-business.onrender.com';


const fetchAuthData = async () => {
    const response = await fetch(`${API_URL}/auth`);
    return response.json();
};


const fetchIndexData = async () => {
    const response = await fetch(`${API_URL}/`);
    return response.json();
};

const fetchAdminData = async () => {
    const response = await fetch(`${API_URL}/admin`);
    return response.json();
};

const fetchStudentData = async () => {
    const response = await fetch(`${API_URL}/student`);
    return response.json();
};

const fetchApplicationData = async () => {
    const response = await fetch(`${API_URL}/application`);
    return response.json();
};

const fetchPaymentData = async () => {
    const response = await fetch(`${API_URL}/student-payment`);
    return response.json();
};

const fetchTranscriptRequestData = async () => {
    const response = await fetch(`${API_URL}/transcript-request`);
    return response.json();
};

const fetchNotificationsData = async () => {
    const response = await fetch(`${API_URL}/notifications`);
    return response.json();
};
module.exports = {
    fetchAuthData,
    // login,
    fetchIndexData,
    fetchAdminData,
    fetchStudentData,
    fetchApplicationData,
    fetchPaymentData,
    fetchTranscriptRequestData,
    fetchNotificationsData
};

