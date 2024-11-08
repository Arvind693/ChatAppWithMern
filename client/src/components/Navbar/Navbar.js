import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { MdGroups } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import UserProfile from '../UserProfile/UserProfile';
import ChatGroupModel from '../GroupChatModel/GroupChatModel';
import SearchUserSidebar from '../SearchUserSidebar/SearchUserSidebar';
import logo1 from '../../Assets/images/aio-globel1.png';
import { ChatState } from '../../Context/ChatProvider';
import './Navbar.css';

const Navbar = () => {
    const [toggleProfile, setToggleProfile] = useState(false);
    const [showGroupModel, setShowGroupModel] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const {user} = ChatState();
    // const user = JSON.parse(localStorage.getItem('userInfo'))?.user || { name: "Shubham", profileImage: null };
    const toggleUserSearch = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    
    const handleToggleProfile =()=>{
        setToggleProfile(!toggleProfile);
    }
    
   
    

    return (
        <nav className="bg-gradient-to-r from-white via-pink-400 to-purple-600 p-4 max-md:p-2">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo/Brand Name */}
                <div className="text-white text-xl font-bold flex items-center gap-3 w-24 max-sm:w-10">
                    <img src={logo1} alt="AIO-Globel Logo" />
                </div>

                <div className='flex gap-20 max-sm:gap-4'>
                    {/* Search Bar Button */}
                    <div className="searchForNewUser flex gap-2 items-center bg-customYellow hover:bg-yellow-400 rounded-lg py-3 px-4 max-md:py-2 max-md:px-1 max-md:rounded"
                      onClick={toggleUserSearch}>
                        <h1 className='text-2xl text-gray-900 '><CiSearch /></h1>
                        <p className='max-sm:hidden'>Search for new User</p>
                        <p className='sm:hidden'>Search Users</p>
                    </div>
                    {isSidebarOpen && <SearchUserSidebar toggleUserSearch={toggleUserSearch} />}

                    {/* Create Group Button */}
                    <div className="searchForNewUser flex gap-2 items-center bg-customYellow hover:bg-yellow-400 rounded-lg py-3 px-4 max-md:py-2 max-md:px-1 max-md:rounded"
                     onClick={() => setShowGroupModel(true)}>
                        <h1 className='text-2xl text-gray-900'><MdGroups /></h1>
                        <p className='max-md:hidden'>Create New Group</p>
                        <p className='md:hidden'>Create Group</p>
                    </div>
                    {showGroupModel && <ChatGroupModel closeModel={() => setShowGroupModel(false)} />}
                </div>

                <div className='flex gap-10 max-sm:gap-2 max-sm:ml-2'>
                    {/* Notification Icon */}
                    <div className="text-white mr-4 mt-3 max-sm:mt-0 max-sm:mr-1">
                        <FontAwesomeIcon icon={faBell} className="text-xl max-sm:text-xs" />
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={handleToggleProfile} >
                        <div className="text-white font-semibold max-sm:hidden">{user.name}</div>
                        
                        {/* Profile Image with Hover Effect */}
                        <div className="relative w-10 h-10 max-sm:w-5 max-sm:h-5 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold hover:scale-110 transition-transform duration-300">
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="User Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <span>{user.name[0]}</span>  
                            )}
                        </div>
                    </div>

                    {/* User Profile Dropdown */}
                    {toggleProfile && (<UserProfile onToggle={handleToggleProfile} />)}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
