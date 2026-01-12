const Resume = require('../models/Resume');

// @desc    Create a new resume
// @route   POST /api/resume
// @access  Private
const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    
    const defaultResumeData = {
      title: title || "Untitled Resume",
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullname: "",
        designation: "",
        summary: ""
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        github: "",
        website: ""
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: ""
        }
      ],
      skills: [
        {
          name: "",
          progress: 0
        }
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: ""
        }
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: ""
        }
      ],
      languages: [
        {
          name: "",
          progress: 0
        }
      ],
      interests: [""],
      userId: req.user.id
    };

    const resume = new Resume(defaultResumeData);
    const savedResume = await resume.save();
    
    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: savedResume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create resume",
      error: error.message
    });
  }
};

// @desc    Get user's resumes
// @route   GET /api/resume
// @access  Private
const getUserResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
      error: error.message
    });
  }
};

// @desc    Get resume by ID
// @route   GET /api/resume/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Check if user owns this resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume'
      });
    }
    
    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message
    });
  }
};

// @desc    Update resume
// @route   PUT /api/resume/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Check if user owns this resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resume'
      });
    }
    
    // Update resume with new data
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { 
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedResume
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to update resume",
      error: error.message
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Check if user owns this resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resume'
      });
    }
    
    await Resume.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message
    });
  }
};

// @desc    Duplicate resume
// @route   POST /api/resume/:id/duplicate
// @access  Private
const duplicateResume = async (req, res) => {
  try {
    const originalResume = await Resume.findById(req.params.id);
    
    if (!originalResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Check if user owns this resume
    if (originalResume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to duplicate this resume'
      });
    }
    
    // Create duplicate with modified title
    const duplicateData = {
      ...originalResume.toObject(),
      title: `${originalResume.title} (Copy)`,
      _id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };
    
    const duplicatedResume = new Resume(duplicateData);
    const savedDuplicate = await duplicatedResume.save();
    
    res.status(201).json({
      success: true,
      message: "Resume duplicated successfully",
      data: savedDuplicate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to duplicate resume",
      error: error.message
    });
  }
};

module.exports = {
  createResume,
  getUserResume,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume
};
