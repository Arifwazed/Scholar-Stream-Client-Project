import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data : userInfo = []} = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user.email}`)
            return res.data;
        }
    });

    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // const user = {
    //     name: "Arif Hamim",
    //     email: "arif@example.com",
    //     phone: "+880 1XXXXXXXXX",
    //     location: "Bangladesh",
    //     role: "Student",
    //     joined: "January 2025",
    // };
    console.log('from profile:',userInfo)
    return (
    <div className="max-w-5xl mx-auto p-6">
        {/* Page Title */}
        <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
        My Profile
        </motion.h1>

        {/* Profile Wrapper */}
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden shadow-xl"
        >
        {/* linear Background */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50" />

        {/* Decorative blur */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Avatar */}
            <div className="relative">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    {/* <User className="h-16 w-16 text-blue-600" /> */}
                    <img className="w-full h-full rounded-full bg-white flex items-center justify-center" src={userInfo.photoURL} alt="" />
                </div>
                </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {user.displayName}
                </h2>
                <p className="mt-1 inline-block px-4 py-1 text-sm rounded-full bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 font-medium">
                {userInfo.role}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 text-sm text-gray-700">
                <div className="flex items-center gap-3 bg-linear-to-r from-blue-100 to-purple-100 backdrop-blur rounded-xl p-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{userInfo.email}</span>
                </div>

                <div className="flex items-center gap-3 bg-linear-to-r from-blue-100 to-purple-100 backdrop-blur rounded-xl p-3">
                    <Phone className="h-4 w-4 text-purple-600" />
                    <span>{userInfo.phone ? userInfo.phone : '+880 1XXXXXXXXX'}</span>
                </div>

                <div className="flex items-center gap-3 bg-linear-to-r from-blue-100 to-purple-100 backdrop-blur rounded-xl p-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{userInfo.location ? userInfo.location: 'not set yet'}</span>
                </div>

                <div className="flex items-center gap-3 bg-linear-to-r from-blue-100 to-purple-100backdrop-blur rounded-xl p-3">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Joined {formatDate(userInfo.createdAt)}</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </motion.div>
    </div>
    );
}

export default MyProfile;