import { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {

        sessionStorage.clear();
        localStorage.clear();

        window.location.href = 'https://spades.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=4l27f32rcgmkkh51eu23g7ormra&redirect_uri=http://localhost:3000/dashboard';
    }, []);

    return null;
};

export default Logout;
