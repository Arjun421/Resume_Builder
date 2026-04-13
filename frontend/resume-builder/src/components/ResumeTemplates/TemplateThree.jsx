import { useRef, useState, useEffect } from "react";
import { LuMail, LuPhone, LuMapPinHouse, LuGithub, LuRss, LuUser } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import InterestSection from "../ResumeSections/InterestSection";

const formatYearMonth = (dateString) => {
  if (!dateString) return '';
  if (dateString.includes('-') && dateString.length === 7) {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  }
  return dateString;
};

const Divider = () => <div className="w-full h-px bg-black my-2" />;

const SectionTitle = ({ text }) => (
  <div className="mb-2">
    <h2 className="text-xs font-bold uppercase tracking-widest text-black">{text}</h2>
    <Divider />
  </div>
);

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="bg-white max-w-full"
      style={{
        transform: containerWidth > 0 ? `scale(${Math.min(scale, 1)})` : "none",
        transformOrigin: "top left",
        width: "100%",
        maxWidth: "800px",
        height: "fit-content",
        fontFamily: "Georgia, serif",
      }}
    >
      <div className="px-10 py-8">

        {/* HEADER */}
        <div className="flex items-start gap-5 mb-4">
          {/* Profile Photo */}
          <div className="w-[70px] h-[70px] rounded-full flex-shrink-0 border-2 border-black overflow-hidden flex items-center justify-center bg-gray-100">
            {resumeData.profileInfo.profilePreviewUrl ? (
              <img src={resumeData.profileInfo.profilePreviewUrl}
                className="w-full h-full object-cover" alt="profile" />
            ) : (
              <LuUser size={30} className="text-gray-500" />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black leading-tight">
              {resumeData?.profileInfo?.fullName || "Your Name"}
            </h1>
            <p className="text-sm text-gray-600 mt-0.5 italic">
              {resumeData?.profileInfo?.designation || "Your Designation"}
            </p>

            {/* Contact info inline */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
              {resumeData.contactInfo.email && (
                <span className="flex items-center gap-1 text-xs text-gray-700">
                  <LuMail size={10} />{resumeData.contactInfo.email}
                </span>
              )}
              {resumeData.contactInfo.phone && (
                <span className="flex items-center gap-1 text-xs text-gray-700">
                  <LuPhone size={10} />{resumeData.contactInfo.phone}
                </span>
              )}
              {resumeData.contactInfo.location && (
                <span className="flex items-center gap-1 text-xs text-gray-700">
                  <LuMapPinHouse size={10} />{resumeData.contactInfo.location}
                </span>
              )}
              {resumeData.contactInfo.linkedin && (
                <span className="flex items-center gap-1 text-xs text-gray-700">
                  <RiLinkedinLine size={10} />{resumeData.contactInfo.linkedin}
                </span>
              )}
              {resumeData.contactInfo.github && (
                <span className="flex items-center gap-1 text-xs text-gray-700">
                  <LuGithub size={10} />{resumeData.contactInfo.github}
                </span>
              )}
              {resumeData.contactInfo.website && (
                <span className="flex items-center gap-1 text-xs text-gray-700">
                  <LuRss size={10} />{resumeData.contactInfo.website}
                </span>
              )}
            </div>
          </div>
        </div>

        <Divider />

        {/* SUMMARY */}
        {resumeData.profileInfo.summary && (
          <div className="mb-4">
            <SectionTitle text="Professional Summary" />
            <p className="text-xs text-gray-800 leading-relaxed">
              {resumeData.profileInfo.summary}
            </p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {resumeData.workExperience?.filter(w => w.company).length > 0 && (
          <div className="mb-4">
            <SectionTitle text="Work Experience" />
            {resumeData.workExperience.filter(w => w.company).map((work, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold text-black">{work.role}</p>
                  <p className="text-xs text-gray-500">
                    {formatYearMonth(work.startDate)} – {formatYearMonth(work.endDate)}
                  </p>
                </div>
                <p className="text-xs text-gray-600 italic">{work.company}</p>
                {work.description && (
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">{work.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {resumeData.education?.filter(e => e.degree).length > 0 && (
          <div className="mb-4">
            <SectionTitle text="Education" />
            {resumeData.education.filter(e => e.degree).map((edu, i) => (
              <div key={i} className="mb-2 flex justify-between items-baseline">
                <div>
                  <p className="text-xs font-bold text-black">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {resumeData.skills?.filter(s => s.name).length > 0 && (
          <div className="mb-4">
            <SectionTitle text="Skills" />
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.filter(s => s.name).map((skill, i) => (
                <span key={i} className="text-xs border border-black px-2 py-0.5 rounded-sm text-black">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {resumeData.projects?.filter(p => p.title).length > 0 && (
          <div className="mb-4">
            <SectionTitle text="Projects" />
            {resumeData.projects.filter(p => p.title).map((project, i) => (
              <div key={i} className="mb-3">
                <ProjectInfo
                  title={project.title}
                  description={project.description}
                  githubLink={project.github}
                  liveDemoUrl={project.liveDemo}
                  bgColor="#f3f4f6"
                />
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {resumeData.certification?.filter(c => c.title).length > 0 && (
          <div className="mb-4">
            <SectionTitle text="Certifications" />
            {resumeData.certification.filter(c => c.title).map((cert, i) => (
              <div key={i} className="flex justify-between items-baseline mb-1">
                <p className="text-xs font-semibold text-black">{cert.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                  {cert.year && <p className="text-xs text-gray-500">{cert.year}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LANGUAGES */}
        {resumeData.languages?.filter(l => l.name).length > 0 && (
          <div className="mb-4">
            <SectionTitle text="Languages" />
            <div className="flex flex-wrap gap-4">
              {resumeData.languages.filter(l => l.name).map((lang, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-black">{lang.name}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(d => (
                      <div key={d} className={`w-2 h-2 rounded-full border border-black ${
                        d <= Math.round((lang.progress || 0) / 20) ? 'bg-black' : 'bg-white'
                      }`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERESTS */}
        {resumeData.interests?.filter(i => i).length > 0 && (
          <div>
            <SectionTitle text="Interests" />
            <InterestSection interests={resumeData.interests} />
          </div>
        )}

      </div>
    </div>
  );
};

export default TemplateThree;
