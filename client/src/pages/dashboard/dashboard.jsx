import React, { useCallback, useEffect, useState } from 'react';
import { User, Mail, Phone, Info, Settings, Shield, Bell, Activity, Edit3, Camera, MapPin, Calendar, Award, ChevronRight, Menu, X, Check, Star, Globe, Briefcase, GraduationCap, Heart, Users, TrendingUp, LogOut } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [userdata, setuserdata] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate()
  const [formdata, setformdata] = useState({
    firstname: userdata.firstname, lastname: userdata.lastname, email: userdata.email, phone: userdata.phone, bio: userdata.bio, location: userdata.location, department: userdata.department, position: userdata.position, company: userdata.company, website: userdata.website, linkedin: userdata.linkedin, skills: userdata.skills, joindate: ''
  });

  const handleupdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/updateuser/${userdata._id}`, formdata, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if(res) {
        console.log('response evaluated', res);
        setuserdata(res.data.user);
        setTimeout(() => {
          window.location.reload()
          setIsEditing(!isEditing);
        }, 1000);
      }

    } catch (err) {
      setTimeout(() => {
        setIsEditing(!isEditing);
      }, 1000);
      console.log(err);
    }
  }

  const getdata = async () => {
    try {
      const user=await JSON.parse(localStorage.getItem('data'));
      console.log(user._id);
      
      const res = await axios.post('http://localhost:3000/getuser', { _id:user._id }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if(res) {
        console.log(res);
        setuserdata(res.data.data);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const data=localStorage.getItem('data')
    setuserdata(data);
 
    getdata();
  }, []);

  console.log(userdata);

  const sidebarItems = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'from-yellow-500 to-orange-500' },
    { id: 'activity', label: 'Activity', icon: Activity, color: 'from-purple-500 to-pink-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-slate-500' }
  ];

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  
  const handlelogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out !"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out successfully",
          text: "You have been successfully logged out",
          icon: "success"
        });
       
        localStorage.clear();
        navigate('/');
      }
    });


  }

  const achievements = [
    { title: 'Design Excellence Award', year: '2024', icon: Award },
    { title: 'Team Leadership Certificate', year: '2023', icon: Users },
    { title: 'UX Research Specialist', year: '2022', icon: GraduationCap }
  ];
  if (userdata)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Mobile Menu Overlay */}

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:transform-none ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
            <div className="h-full overflow-y-auto">
              {/* Mobile Close Button */}
              <div className="lg:hidden flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Profile Section */}
              <div className="p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-white to-gray-100 p-1 shadow-xl">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {!userdata.profileurl ? <img
                          src=""
                          alt="Profile"
                          className="w-full h-full object-cover"
                        /> : <img
                          src={userdata.profileurl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />}
                      </div>
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:bg-gray-50 transition-all hover:scale-105">
                      <Camera size={18} />
                    </button>
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{userdata.firstname} {userdata.lastName}</h2>
                  <p className="text-indigo-100 text-sm mb-1">{userdata.position}</p>
                  <p className="text-indigo-200 text-xs mb-4">{userdata.company}</p>
                  <div className="flex items-center justify-center text-indigo-100 text-sm bg-[#4374f1] rounded-full px-1 py-2 backdrop-blur-sm">
                    <Award size={12} className="mr-1" />
                    <span>Verified Professional</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#031f1e] bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center text-indigo-100 mb-1">
                      <Calendar size={14} className="mr-2" />
                      <span className="text-xs">Member Since</span>
                    </div>
                    <p className="text-white font-semibold text-sm text-center">{userdata.joinDate}</p>
                  </div>
                  <div className="bg-[#031f1e] bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center text-indigo-100 mb-1">
                      <MapPin size={14} className="mr-2" />
                      <span className="text-xs ">Location</span>
                    </div>
                    <p className="text-white font-semibold text-sm text-center">{userdata.location}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-6 space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-200 group ${activeTab === item.id
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-lg border border-indigo-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mr-3 ${activeTab === item.id ? 'shadow-md' : 'opacity-70 group-hover:opacity-100'
                          }`}>
                          <Icon size={18} className="text-white" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'rotate-90 text-indigo-500' : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Achievement Badge */}
              <div className="p-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-500 mr-2" size={16} />
                    <span className="font-semibold text-gray-800 text-sm">Achievement</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Top Performer This Quarter</p>
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">80% Complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => setIsMobileMenuOpen(true)}
                      className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors mr-4"
                    >
                      <Menu size={20} />
                    </button>
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        {sidebarItems.find(item => item.id === activeTab)?.label}
                      </h1>
                      <p className="text-gray-600 text-sm lg:text-base">Manage your account details and preferences</p>
                    </div>
                  </div>
           <div className='flex gap-10 items-center'><button onClick={handlelogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
                  {!isEditing ? <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
                  >
                    <Edit3 size={16} className="mr-2" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button> :
                    <button
                      onClick={handleupdate}
                      className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"  >
                      <Edit3 size={16} className="mr-2" />
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>}</div>
                </div>
              </div>
            </header>

            <main className="p-6 lg:p-8 max-w-7xl mx-auto">
              {activeTab === 'personal' && (
                <div className="space-y-8">

                  {/* Basic Information */}
                  <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-50">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Basic Information</h3>
                        <p className="text-gray-600 text-sm">Your personal details</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                        {!isEditing ? <input
                          type="text"
                          value={userdata.firstname}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="text"
                          name='firstname'
                          value={formdata.firstname}
                          onChange={handlechange
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                        {!isEditing ? <input
                          type="text"
                          value={userdata.lastname}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="text"
                          name='lastname'
                          value={formdata.lastname}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Position</label>
                        {!isEditing ? <input
                          type="text"
                          value={userdata.position}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="text"
                          name='position'
                          value={formdata.position}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Department</label>
                        {!isEditing ? <input
                          type="text"
                          name='department'
                          value={userdata.department}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="text"
                          name='department'
                          onChange={handlechange}
                          value={formdata.department}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-50">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                        <Mail className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Contact Information</h3>
                        <p className="text-gray-600 text-sm">How people can reach you</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        {!isEditing ? <input
                          type="email"
                          name='email'
                          value={userdata.email}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="email"
                          value={formdata.email}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        {!isEditing ? <input
                          type="number"
                          name='phone'
                          value={userdata.phone}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="number"
                          name='phone'
                          value={formdata.phone}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Website</label>
                        {!isEditing ? <input
                          type="url"
                          value={userdata.website}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="url"
                          name='website'
                          value={formdata.website}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">LinkedIn</label>
                        {!isEditing ? <input
                          type="url"
                          name='linkedin'
                          value={userdata.linkedin}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        /> : <input
                          type="url"
                          name='linkedin'
                          value={formdata.linkedin}
                          onChange={handlechange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 text-sm lg:text-base"
                        />}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Biography */}
                    <div className="lg:col-span-2 bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-50">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                          <Info className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Professional Biography</h3>
                          <p className="text-gray-600 text-sm">Tell your professional story</p>
                        </div>
                      </div>
                      {!isEditing ? <textarea
                        value={userdata.bio}
                        disabled={!isEditing}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 resize-none text-sm lg:text-base"
                        placeholder="Share your professional journey, expertise, and what drives you..."
                      /> : <textarea
                        value={formdata.bio}
                        name='bio'
                        onChange={handlechange}
                        disabled={!isEditing}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 resize-none text-sm lg:text-base"
                        placeholder="Share your professional journey, expertise, and what drives you..."
                      />}
                    </div>

                    {/* Skills & Achievements */}
                    <div className="space-y-6">
                      {/* Skills */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-50">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3 shadow-md">
                            <Briefcase className="text-white" size={16} />
                          </div>
                          <h4 className="font-bold text-gray-900">Top Skills</h4>
                        </div>
                        {userdata.skills ? <div className="flex flex-wrap gap-2">
                          {userdata.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100"
                            >
                              {skill}
                            </span>
                          ))}
                        </div> : <div></div>}
                      </div>

                      {/* Achievements */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-50">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-md">
                            <Award className="text-white" size={16} />
                          </div>
                          <h4 className="font-bold text-gray-900">Achievements</h4>
                        </div>
                        <div className="space-y-3">
                          {achievements.map((achievement, index) => {
                            const Icon = achievement.icon;
                            return (
                              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                                <Icon size={16} className="text-gray-600 mr-3" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                                  <p className="text-xs text-gray-500">{achievement.year}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'personal' && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Settings size={32} className="lg:w-12 lg:h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                    {sidebarItems.find(item => item.id === activeTab)?.label} Coming Soon
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm lg:text-base">
                    This section is under development. Check back soon for more features and settings.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
};



export default Dashboard;