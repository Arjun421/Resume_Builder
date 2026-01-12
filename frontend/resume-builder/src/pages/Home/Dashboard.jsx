import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create New Resume
          </button>
        </div>

        {allResumes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No resumes found. Create your first resume!</p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/resume/${resume._id}`)}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resume.title || 'Untitled Resume'}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Created: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 text-sm font-medium">
                    Edit Resume
                  </span>
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;