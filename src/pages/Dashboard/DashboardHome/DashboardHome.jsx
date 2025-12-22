import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import UserDashboardHome from './UserDashboardHome';
import ModeratorDashboardHome from './ModeratorDashboardHome';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
        return <Loading></Loading> ;
    }

    if(role === 'Admin'){
        return <AdminDashboardHome></AdminDashboardHome>;
    }
    else if(role === 'Student'){
        return <UserDashboardHome></UserDashboardHome>;
    }
    else{
        return <ModeratorDashboardHome></ModeratorDashboardHome>
    }
    // return <AdminDashboardHome></AdminDashboardHome> ;
};

export default DashboardHome;