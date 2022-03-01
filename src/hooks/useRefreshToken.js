import axios from '../api/axios';
import {setAuth} from '../hooks/useAuth';

const useRefreshToken = () => {
   

    const refresh = async () => {
        const response = await axios.get('/user/refreshToken', {
            withCredentials: true
        });
        setAuth(response.data.accessToken);
        return response.data.accessToken;
    }  
    return refresh;
};

export default useRefreshToken;
