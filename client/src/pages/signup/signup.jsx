import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'
import {
  ChevronRight, ChevronLeft, User, Mail, Phone, MapPin,
  Briefcase, Globe, Linkedin, FileText, Award, Plus, X,
  Check, Calendar, Building, Star, Target
} from 'lucide-react';

const MultiPageProfessionalForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    department: '',
    company: '',
    website: '',
    linkedin: '',
    bio: '',
    skills: [],
    profileurl: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const steps = [
    {
      id: 1,
      title: '',
      subtitle: '',
      icon: User,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Personal Information',
      subtitle: 'Let\'s start with your basic details',
      icon: User,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Contact Details',
      subtitle: 'How can people reach you?',
      icon: Mail,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Professional Info',
      subtitle: 'Tell us about your career',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Online Presence',
      subtitle: 'Your digital footprint',
      icon: Globe,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 6,
      title: 'About & Skills',
      subtitle: 'Share your story and expertise',
      icon: Award,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.username.trim()) newErrors.username = 'username is required';
        else if (!/\S+@\S+\.\S+/.test(formData.username)) newErrors.username = 'Email is invalid';
        if (!formData.password.trim()) newErrors.lastName = 'password is required';
        break;
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        break;
      case 3:
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.profileurl.trim()) newErrors.profileurl = 'profileurl is required';
        else if (formData.profileurl && !/^https?:\/\/.+/.test(formData.profileurl)) {
          newErrors.profileurl = 'Please enter a valid URL (with http:// or https://)';
        }

        break;
      case 4:
        if (!formData.position.trim()) newErrors.position = 'Position is required';
        if (!formData.company.trim()) newErrors.company = 'Company is required';
        if (!formData.department.trim()) newErrors.department = 'Department is required';

        break;
      case 5:
        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
          newErrors.website = 'Please enter a valid URL (with http:// or https://)';
        }
        break;
      case 6:
        if (!formData.bio.trim()) newErrors.bio = 'Biography is required';
        if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      if (errors.skills) {
        setErrors(prev => ({ ...prev, skills: '' }));
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      // setIsLoading(true);
      try {

        const res = axios.post('http://localhost:3000/signup', {
          firstname: formData.firstName,
          lastname: formData.lastName,
          password: formData.password,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          position: formData.phone,
          department: formData.department,
          company: formData.company,
          website: formData.website,
          linkedin: formData.linkedin,
          bio: formData.bio,
          skills: formData.skills,
          profileurl: formData.profileurl
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

      }
      catch (err) {
        console.log(err);
      }
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 relative overflow-hidden">

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Professional Profile Setup
          </h1>
          <p className="text-gray-600 text-lg">
            Create your comprehensive professional profile
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="hidden lg:flex items-center justify-center mb-8 space-x-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all ${isCurrent
                  ? 'bg-white shadow-lg scale-105'
                  : isCompleted
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-400'
                  }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCurrent
                    ? `bg-gradient-to-r ${step.color} text-white shadow-md`
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                    }`}>
                    {isCompleted ? (
                      <Check size={16} />
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isCurrent ? 'text-gray-900' : ''
                    }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight size={16} className="text-gray-300 mx-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${currentStepData.color} flex items-center justify-center mb-4 shadow-lg`}>
              <currentStepData.icon size={28} className="text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User size={16} className="mr-2 text-blue-500" />
                    Username *
                  </label>
                  <input
                    type="email"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    placeholder="Enter username"
                    required:true
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User size={16} className="mr-2 text-blue-500" />
                    Password *
                  </label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User size={16} className="mr-2 text-blue-500" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User size={16} className="mr-2 text-blue-500" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}
            {/* Step 2: Contact Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail size={16} className="mr-2 text-purple-500" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone size={16} className="mr-2 text-purple-500" />
                      Phone Number *
                    </label>
                    <input
                      type="number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin size={16} className="mr-2 text-purple-500" />
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.location ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="City, State/Country"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin size={16} className="mr-2 text-purple-500" />
                      ProfileImageUrl *
                    </label>
                    <input
                      type="text"
                      value={formData.profileurl}
                      onChange={(e) => handleInputChange('profileurl', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.profileurl ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="Enter Imageurl"
                      required
                    />
                    {errors.profileurl && (
                      <p className="text-red-500 text-sm mt-1">{errors.profileurl}</p>
                    )}
                  </div>
                </div>
              </div>

            )}

            {/* Step 3: Professional Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Position/Title *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.position ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="Senior Product Designer"
                    />
                    {errors.position && (
                      <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Building size={16} className="mr-2 text-green-500" />
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.company ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="TechCorp Solutions"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Briefcase size={16} className="mr-2 text-green-500" />
                      Department *
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.department ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      placeholder="Design & Innovation"
                    />
                    {errors.department && (
                      <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                    )}
                  </div>


                </div>
              </div>
            )}

            {/* Step 4: Online Presence */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Globe size={16} className="mr-2 text-orange-500" />
                    Personal Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.website ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Linkedin size={16} className="mr-2 text-orange-500" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex items-start">
                    <Globe className="text-orange-500 mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Recommended</h4>
                      <p className="text-gray-600 text-sm">
                        Adding your online presence helps colleagues and clients connect with you professionally.
                        These fields are optional but can enhance your professional profile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: About & Skills */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <FileText size={16} className="mr-2 text-indigo-500" />
                    Professional Biography *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    placeholder="Tell us about your professional journey, expertise, and what drives you in your career..."
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Award size={16} className="mr-2 text-indigo-500" />
                    Skills & Expertise *
                  </label>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-2 rounded-xl border border-indigo-200"
                      >
                        <span className="text-sm font-medium mr-2">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-indigo-500 hover:text-indigo-700 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Add a skill (e.g., UI/UX Design)"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add
                    </button>
                  </div>

                  {errors.skills && (
                    <p className="text-red-500 text-sm">{errors.skills}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between w-[86vw] lg:w-full mt-8 pt-8 border-t border-gray-100">
           <div className='mt-8'> <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`prev flex items-center py-3 px-6   rounded-xl transition-all ${currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <ChevronLeft size={16} className="mr-2" />
              Previous
            </button></div>

            {currentStep < steps.length ? (
              <div className="form-footer  "> <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Next Step
                <ChevronRight size={16} className="ml-2" />
              </button>

                <p>Already have an account?<br/>
                  <Link to={'/login'} className="toggle-btn">
                    Login
                  </Link>
                </p>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Check size={16} className="mr-2" />
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="lg:hidden mt-6 text-center">
          <p className="text-sm text-gray-600">
            {currentStep} of {steps.length} - {currentStepData.title}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>

  );
};

export default MultiPageProfessionalForm;