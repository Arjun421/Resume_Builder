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
const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("contact-info");
  const [progress, setProgress] = useState(0);
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
  language:[
    {
      name:"",
      progress:0
    }
  ],
  interests:[""],
});
  const [errorMsg,setErrorMsg]=useState("")
  const [isLoading,setIsLoading]=useState(false)

  //validate Inputs
  const validateAndNext=(e)=>{};
  //function to navigate to next page
  const goToNextStep=()=>{}
  //back
  const goBack = ()=>{}
const renderForm = () => {
  switch(currentPage) {
    case "profile-info":
      return (
        <ProfileInfoCard
          profileData={resumeData?.profileInfo}
          updateSection={(key, value) => {
            updateSection("profile-info", key, value)
          }}
          onNext={validateAndNext}
        />
      );
      case "contact-info":
  return (
    <ContactInfoForm
      contactInfo={resumeData?.contactInfo}
      updateSection={(key, value) => {
        updateSection("contact-info", key, value);
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

  const updateArrayItems=(section,index,key,value)=>{}
  const addArrayItems=(section,newItem)=>{}
  const removeArrayItem=(section,index)=>{}
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
          language: resumeInfo?.language || prevState?.language,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (err) {
      console.error('❌ Error fetching resume:', err);
      setErrorMsg(err.message || 'Failed to fetch resume details');
    }
  }
  const uploadResumeImages = async ()=>{}
  const updateResumeDetails = async(thumbnailLink,profilePreviewUrl)=>{}
  const handleDeleteResume = async()=>{}
  const reactToPrintFn=useReactToPrint({contentRef:resumeDownloadRef})
  const updateBaseWidth=()=>{}
  useEffect(()=>{
    updateBaseWidth()
    window.addEventListener('resize',updateBaseWidth)
    if(resumeId){
      fetchResumeDetailsById()
    }
    return ()=>{
      window.addEventListener('resize',updateBaseWidth)
    }
  },[])
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
        <div className='bg-white rounded-lg border border-purple-100 overflow-hidden'>
          <StepProgress progress={0} />
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
              disabled={isLoading}
              >
                <LuArrowLeft className='text-[16px]'/>
                Back
             

            </button>
            <button className='btn-small-light'
              onClick={uploadResumeImages}
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
        </div>
        <div  ref={resumeRef} className='h-[100vh]'>
          {/*Resume Template*/}
        </div>
      </div>
      
  
    </div>
  </DashboardLayout>
  
);




};
export default EditResume;
