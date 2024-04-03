import { useEffect } from 'react';
import { setUserId } from '../../Redux/user/userSlice';

const Logout = () => {
    useEffect(() => {

        sessionStorage.clear();
        localStorage.clear();
        setUserId("");

        window.location.href = 'https://spades.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=4l27f32rcgmkkh51eu23g7ormra&logout_uri=https://dev.dzym427ke4wx7.amplifyapp.com/logout';
    }, []);

    return null;
};

export default Logout;
