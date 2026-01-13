import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/Modal";
import { LuCirclePlus } from "react-icons/lu";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from './CreateResumeForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllResumes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('📋 Fetching all resumes...');
      
      const response = await axiosInstance.get('/resume');
      console.log('✅ Resumes fetched:', response.data);
      
      setAllResumes(response.data.data || response.data || []);
    } catch (error) {
      console.error("❌ Error fetching resumes:", error);
      setError(error.message || 'Failed to fetch resumes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchAllResumes}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log('🔍 Dashboard render - openCreateModal:', openCreateModal);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        <div 
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
          onClick={() => {
            console.log('🔥 Add New Resume clicked!');
            console.log('🔍 Current openCreateModal state:', openCreateModal);
            setOpenCreateModal(true);
            console.log('🔍 Setting openCreateModal to true');
          }}
        >
          <div className="w-12 h-12 flex justify-center items-center bg-purple-200/60 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500"/>
          </div>
          <h3 className="font-medium text-gray-800">Add New Resume</h3>
        </div>
        
        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            imageUrl={resume?.thumbnailLink || null}
            title={resume?.title}
            lastUpdated={resume?.updatedAt ? moment(resume.updatedAt).format("Do MMM YYYY") : ""}
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </div>
      
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateResumeForm 
          onClose={() => setOpenCreateModal(false)}
          onResumeCreated={fetchAllResumes}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;