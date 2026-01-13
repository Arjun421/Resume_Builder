import React, { useState,useRef } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import  TitleInput from "../../components/Inputs/TitleInput";

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
const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
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
      </div>
      
    </div>
  </DashboardLayout>
);




};
export default EditResume;
