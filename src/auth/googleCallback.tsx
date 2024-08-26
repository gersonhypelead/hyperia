import React, { useEffect } from 'react';

const GoogleCallback = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            console.log("token ->", token);
            window.location.href = '/';
        } else {
            console.error('No token found in URL');
        }
    }, []);

    return <div>Loading...</div>;
};

export default GoogleCallback;











