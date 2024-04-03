import { useEffect } from 'react';
import { SIGNIN_URL } from '../../Utils/Parameter';


const Logout = () => {
    useEffect(() => {

        sessionStorage.clear();
        localStorage.clear();
        window.location.href = SIGNIN_URL;
    }, []);

    return null;
};

export default Logout;
