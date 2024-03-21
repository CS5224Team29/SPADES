import { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {

        sessionStorage.clear();
        localStorage.clear();

        window.location.href = 'https://spadesdemo.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=5sj2eu3tdbi3hjk002q1c7clun&redirect_uri=https://dev.dzym427ke4wx7.amplifyapp.com/dashboard';
    }, []);

    return null;
};

export default Logout;
