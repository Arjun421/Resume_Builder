import React, { useState,useRef, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import  TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from 'react-to-print';
import { API_PATHS } from "../../utils/apiPath";

import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import StepProgress from '../../components/StepProgress';
import ProfileInfoCard from '../../components/Cards/ProfileInfoCard';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationDetailsForm from './Forms/EducationDetailsForm';
import SkillsInfoForm from './Forms/SkillsInfoForm';
import ProjectsDetailFrom from './Forms/ProjectsDetailFrom';
import CertificationInfoForm from './Forms/CertificationInfoForm';
import AdditionalInfoForm from './Forms/AdditionalInfoForm';
import RenderResume from '../../components/ResumeTemplates/RenderResume';
const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

const [currentPage, setCurrentPage] = useState("profile-info");

  const steps = [
    "profile-info",
    "contact-info", 
    "work-experience",
    "education-info",
    "skills",
    "projects",
    "certifications",
    "additionalInfo"
  ];

  const currentStepIndex = steps.indexOf(currentPage);
  const totalSteps = steps.length;

  const [progress, setProgress] = useState(0);

  // Calculate progress based on current step
  const calculateProgress = () => {
    return Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  };
  const [resumeData, setResumeData] = useState({
  title: "",
  thumbnailLink: "",
  profileInfo: {
    profileImg: null,
    profilePreviewUrl: "",
    fullName: "",
    designation: "",
    summary: "",
  },
  template: {
    theme: "",
    colorPalette: "",
  },
  contactInfo: {
    email: "",
    phone: "",
    linkedin: "",
    github:"",
    website:""
  },
  workExperience:[
    {
      company:"",
      role:"",
      startDate:"",
      endDate:"",
      description:""
    }
  ],
  education:[
    {
      degree:"",
      institution:"",
      startDate:"",
      endDate:""
    }
  ],
  skills:[
    {
      name:"",
      progress:0
    }
  ],
  projects:[
    {title:"",
      description:"",
      github:"",
      liveDemo:""
    }

  ],
  certification:[
    {
      title:"",
      issuser:"",
      year:""

    }
  ],
  languages:[
    {
      name:"",
      progress:0
    }
  ],
  interests:[""],
});
  const [errorMsg,setErrorMsg]=useState("")
  const [isLoading,setIsLoading]=useState(false)

  
  const validateAndNext=(e)=>{
    e?.preventDefault();
    const errors = [];
    
    switch(currentPage) {
      case "profile-info":
        if (!resumeData.profileInfo?.fullName?.trim()) {
          errors.push("Full name is required");
        }
        if (!resumeData.profileInfo?.designation?.trim()) {
          errors.push("Designation is required");
        }
        if (!resumeData.profileInfo?.summary?.trim()) {
          errors.push("Professional summary is required");
        }
        break;
        
      case "contact-info":
        if (!resumeData.contactInfo?.email?.trim()) {
          errors.push("Email is required");
        }
        if (!resumeData.contactInfo?.phone?.trim()) {
          errors.push("Phone number is required");
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (resumeData.contactInfo?.email && !emailRegex.test(resumeData.contactInfo.email)) {
          errors.push("Please enter a valid email address");
        }
        break;
        
      case "work-experience":
        if (!resumeData.workExperience || resumeData.workExperience.length === 0) {
          errors.push("At least one work experience is required");
        } else {
          resumeData.workExperience.forEach((exp, index) => {
            if (!exp.company?.trim()) {
              errors.push(`Company name is required for experience ${index + 1}`);
            }
            if (!exp.role?.trim()) {
              errors.push(`Role is required for experience ${index + 1}`);
            }
            if (!exp.startDate?.trim()) {
              errors.push(`Start date is required for experience ${index + 1}`);
            }
          });
        }
        break;
        
      case "education-info":
        if (!resumeData.education || resumeData.education.length === 0) {
          errors.push("At least one education entry is required");
        } else {
          resumeData.education.forEach((edu, index) => {
            if (!edu.degree?.trim()) {
              errors.push(`Degree is required for education ${index + 1}`);
            }
            if (!edu.institution?.trim()) {
              errors.push(`Institution is required for education ${index + 1}`);
            }
          });
        }
        break;
        
      case "skills":
        if (!resumeData.skills || resumeData.skills.length === 0) {
          errors.push("At least one skill is required");
        } else {
          resumeData.skills.forEach((skill, index) => {
            if (!skill.name?.trim()) {
              errors.push(`Skill name is required for skill ${index + 1}`);
            }
          });
        }
        break;
        
      case "projects":
        // Projects are optional, but if added, validate required fields
        if (resumeData.projects && resumeData.projects.length > 0) {
          resumeData.projects.forEach((project, index) => {
            if (!project.title?.trim()) {
              errors.push(`Project title is required for project ${index + 1}`);
            }
            if (!project.description?.trim()) {
              errors.push(`Project description is required for project ${index + 1}`);
            }
          });
        }
        break;
        
      case "certifications":
        // Certifications are optional, but if added, validate required fields
        if (resumeData.certification && resumeData.certification.length > 0) {
          resumeData.certification.forEach((cert, index) => {
            if (!cert.title?.trim()) {
              errors.push(`Certification title is required for certification ${index + 1}`);
            }
            if (!cert.issuser?.trim()) {
              errors.push(`Issuer is required for certification ${index + 1}`);
            }
          });
        }
        break;
        
      case "additionalInfo":
        // Additional info is optional, but if languages are added, validate them
        if (resumeData.language && resumeData.language.length > 0) {
          resumeData.language.forEach((lang, index) => {
            if (!lang.name?.trim()) {
              errors.push(`Language name is required for language ${index + 1}`);
            }
          });
        }
        break;
        
      default:
        break;
    }
    
    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }
    
    // Clear errors and proceed to next step
    setErrorMsg("");
    goToNextStep();
  };
  
  //function to navigate to next page
  const goToNextStep=()=>{
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      setCurrentPage(nextStep);
      setProgress(calculateProgress());
    }
  }
  
  //back
  const goBack = ()=>{
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      setCurrentPage(prevStep);
      setProgress(calculateProgress());
    }
  }
const renderForm = () => {
  switch(currentPage) {
    case "profile-info":
      return (
        <ProfileInfoCard
          profileData={resumeData?.profileInfo}
          updateSection={(key, value) => {
            updateSection("profileInfo", key, value)
          }}
          onNext={validateAndNext}
        />
      );
      case "contact-info":
  return (
    <ContactInfoForm
      contactInfo={resumeData?.contactInfo}
      updateSection={(key, value) => {
        updateSection("contactInfo", key, value);
      }}
    />
  );
  case "work-experience":
  return (
    <WorkExperienceForm
      workExperience={resumeData?.workExperience}
      updateArrayItems={(index, key, value) => 
        updateArrayItems('workExperience', index, key, value)
      }
      addArrayItems={(newItem) => 
        addArrayItems("workExperience", newItem)
      }
      removeArrayItem={(index) => 
        removeArrayItem("workExperience", index)
      }
    />
  )
  case "education-info":
  return(
    <EducationDetailsForm
      educationInfo={resumeData?.education}
      updateArrayItems={(index,key,value)=>{
        updateArrayItems("education",index,key,value)
      }} 
      addArrayItems={(newItem)=>addArrayItems("education",newItem)}
      removeArrayItem={(index)=>removeArrayItem("education",index)}
    />
  )
  case "skills":
  return (
    <SkillsInfoForm
      skillsInfo={resumeData?.skills}
      updateArrayItems={(index, key, value) => 
        updateArrayItems("skills", index, key, value)
      }
      addArrayItems={(newItem) => 
        addArrayItems("skills", newItem)
      }
      removeArrayItem={(index) => 
        removeArrayItem("skills", index)
      }
    />
  );
  case "projects":
  return (
    <ProjectsDetailFrom
      projectInfo={resumeData?.projects}
      updateArrayItems={(index, key, value) => 
        updateArrayItems("projects", index, key, value)
      }
      addArrayItems={(newItem) => 
        addArrayItems("projects", newItem)
      }
      removeArrayItem={(index) => 
        removeArrayItem("projects", index)
      }
    />
  );
  case "certifications":
  return (
    <CertificationInfoForm
      certificationInfo={resumeData?.certification}
      updateArrayItems={(index, key, value) => 
        updateArrayItems("certification", index, key, value)
      }
      addArrayItems={(newItem) => 
        addArrayItems("certification", newItem)
      }
      removeArrayItem={(index) => 
        removeArrayItem("certification", index)
      }
    />
  );
  case "additionalInfo":
  return (
    <AdditionalInfoForm
      languageInfo={resumeData?.language}
      interestsInfo={resumeData?.interests}
      updateArrayItems={updateArrayItems}
      addArrayItems={addArrayItems}
      removeArrayItem={removeArrayItem}
      updateSection={updateSection}
    />
  );

    default:
      return null
  }
}

  const updateSection = (section, key, value) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value
    }
  }))
}

  const updateArrayItems=(section,index,key,value)=>{
    console.log('🔄 updateArrayItems called:', { section, index, key, value });
    setResumeData((prev)=>{
      const updatedArray =[...prev[section]]
      if(key===null){
        updatedArray[index]=value;

      }else{
        updatedArray[index]={
          ...updatedArray[index],
          [key]:value
        }
      }
      console.log('📊 Updated array:', updatedArray);
      return {
        ...prev,
        [section]:updatedArray
      }
    })
  }
  const addArrayItems=(section,newItem)=>{
    console.log('➕ addArrayItems called:', { section, newItem });
    setResumeData((prev)=>({
      ...prev,
      [section]:[...prev[section],newItem]

    }))
  }
  const removeArrayItem=(section,index)=>{
    setResumeData((prev)=>{
      const updateArray=[...prev[section]]
      updateArray.splice(index,1)
      return {
        ...prev,
        [section]:updateArray
      }
    })
  }
  const fetchResumeDetailsById=async()=>{
    try {
      console.log('📋 Fetching resume details for ID:', resumeId);
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      console.log('✅ Resume fetched:', response.data);

      if (response.data && response.data.success) {
        const resumeInfo = response.data.data; // Backend returns data inside 'data' field

        console.log('📝 Setting resume data:', resumeInfo);

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certification: resumeInfo?.certification || prevState.certification,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (err) {
      console.error('❌ Error fetching resume:', err);
      setErrorMsg(err.message || 'Failed to fetch resume details');
    }
  }
  const uploadResumeImages = async ()=>{}
  
  const saveResumeData = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      
      console.log('💾 Saving resume data:', resumeData);
      
      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        resumeData
      );
      
      if (response.data && response.data.success) {
        toast.success("Resume updated successfully!");
        // Navigate back to dashboard after successful save
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        throw new Error(response.data?.message || "Failed to update resume");
      }
    } catch (error) {
      console.error('❌ Error saving resume:', error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update resume";
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateResumeDetails = async(thumbnailLink,profilePreviewUrl)=>{}
  const handleDeleteResume = async()=>{}
  const reactToPrintFn=useReactToPrint({contentRef:resumeDownloadRef})
  const updateBaseWidth=()=>{
    if (resumeRef.current){
      setBaseWidth(resumeRef.current.offsetWidth)
    }
  }
  useEffect(()=>{
    updateBaseWidth()
    window.addEventListener('resize',updateBaseWidth)
    if(resumeId){
      fetchResumeDetailsById()
    }
    // Set initial progress
    setProgress(calculateProgress());
    
    return ()=>{
      window.removeEventListener('resize',updateBaseWidth)
    }
  },[resumeId]) // Only depend on resumeId, not currentPage

  // Separate useEffect for updating progress when page changes
  useEffect(() => {
    setProgress(calculateProgress());
  }, [currentPage])
return (
  <DashboardLayout>
    <div className="container mx-auto">
      <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
        <TitleInput
          title={resumeData.title}
          setTitle={(value) =>
            setResumeData((prevState) => ({
              ...prevState,
              title: value,
            }))
          }
        />
        <div className='flex items-center gap-4'>
          <button className='btn-small-light'
          
            onClick={()=>setOpenThemeSelector(true)}>
            <LuPalette className='text-[16px]'/>
            <span className='hidden md:block'>Change Theme</span>
          </button>
          <button className='btn-small-light' onClick={handleDeleteResume}>
            <LuTrash2 className='text-[16px]'/>
            <span className='hidden md:block'>Delete</span>

          </button>
          <button className='btn-small-light'
          onClick={()=>setOpenPreviewModal(true)}
          >
          <LuDownload className='text-[16px]'/>
            <span className='hidden md:block'>Preview & Download</span>
          </button>
          
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        { <div className='bg-white rounded-lg border border-purple-100 overflow-hidden'>
          <StepProgress progress={calculateProgress()} />
          {renderForm()}
          <div className='mx-5'>
            {errorMsg &&(
              <div className='flex items-center gp-2 text-[11px] font-medium text-amber-609 bg-amber-100 px-2 py-0.5 my-1 rounded'>
                <LuCircleAlert className='text-md'/>{errorMsg}
              </div>
            )}
            <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
            <button className='btn-small-light'
              onClick={goBack}
              disabled={isLoading || currentStepIndex === 0}
              >
                <LuArrowLeft className='text-[16px]'/>
                Back
             

            </button>
            <button className='btn-small-light'
              onClick={saveResumeData}
              disabled={isLoading}
              >
                <LuSave className='text-[16px]'/>
                  {isLoading ? "Updating...":"Save & Exit"}
            </button>
             <button className='btn-small'
              onClick={validateAndNext}
              disabled={isLoading}
              >
                {currentPage==="additionalInfo" && (
                  <LuDownload className='text-[16px]'/>
                )}
                {currentPage==="additionalInfo"
                ? "Preview and Download" : "Next"
                }
                {currentPage!=="additionalInfo" &&(
                  <LuArrowLeft className='text-[16px] rotate-180'/>
                )}
               
            </button>
            </div>
          </div>
        </div>} 
        <div ref={resumeRef} className='h-[100vh] overflow-auto'>
          {/*Resume Template*/}
          <RenderResume
          templateId={resumeData?.template?.theme || ""}
          resumeData={resumeData}
          colorPalette={resumeData?.template?.colorPalette || []}
          containerWidth={baseWidth}
          
          />
        </div>
      </div>
      
  
    </div>
  </DashboardLayout>
  
);




};
export default EditResume;
