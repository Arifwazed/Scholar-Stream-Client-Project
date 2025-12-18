import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Login from '../pages/auth/Login/Login';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading/Loading';

const AdminRoute = ({children}) => {
    const {loading} = useAuth();
    const {role,roleLoading} = useRole();
    const navigate = useNavigate()

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(role !==  'Admin'){
        // remove navigate and add forbidden file below
        return navigate('/login');
    }
    return children;
};

export default AdminRoute;