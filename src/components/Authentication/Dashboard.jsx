import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Dashboard() {

    const [userInfo, setUserInfo] = React.useState(null);
    const user = Cookies.get('user');
    const BASE_URL = process.env.REACT_APP_API_URL + '/user';

    React.useEffect(() => {
        if (!user) {
            return;
        }
        
        const parsedAuthHeader = JSON.parse(user);
        try{
            axios.get(`${BASE_URL}/login`, {
                headers: {
                    'Authorization': parsedAuthHeader,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
        catch(error){
            console.error('Error fetching user data:', error);
        }
    }, [user]);

  return (
    <div>
      
    </div>
  )
}
