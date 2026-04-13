import { useRef, useState, useEffect } from "react";
import {
  LuMapPinHouse, LuMail, LuPhone, LuRss, LuGithub, LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import InterestSection from "../ResumeSections/InterestSection";
import ProjectInfo from "../ResumeSections/ProjectInfo";

const DEFAULT_THEME = ["#1E293B", "#334155", "#6366F1", "#E2E8F0", "#F8FAFC"];

const formatYearMonth = (dateString) => {
  if (!dateString) return '';
  if (dateString.includes('-') && dateString.length === 7) {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  }
  return dateString;
};

const SectionTitle = ({ text, accentColor }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-1 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700">{text}</h2>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const SkillBadge = ({ name, progress, accentColor }) => {
  const level = Math.round((progress || 0) / 20);
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-gray-700">{name}</span>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: i <= level ? accentColor : '#E2E8F0' }} />
        ))}
      </div>
    </div>
  );
};

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  const accent = themeColors[2] || "#6366F1";
  const dark = themeColors[0] || "#1E293B";
  const light = themeColors[4] || "#F8FAFC";

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
      }}
    >
      {/* TOP HEADER BANNER */}
      <div className="px-8 py-6" style={{ backgroundColor: dark }}>
        <div className="flex items-center gap-5">
          {/* Profile Photo */}
          <div className="w-[80px] h-[80px] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: accent }}>
            {resumeData.profileInfo.profilePreviewUrl ? (
              <img src={resumeData.profileInfo.profilePreviewUrl}
                className="w-full h-full object-cover" alt="profile" />
            ) : (
              <LuUser size={36} color="#fff" />
            )}
          </div>

          {/* Name & Designation */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white leading-tight">
              {resumeData?.profileInfo?.fullName || "Your Name"}
            </h1>
            <p className="text-sm mt-1" style={{ color: accent }}>
              {resumeData?.profileInfo?.designation || "Your Designation"}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {resumeData.contactInfo.email && (
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <LuMail size={11} /> {resumeData.contactInfo.email}
                </span>
              )}
              {resumeData.contactInfo.phone && (
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <LuPhone size={11} /> {resumeData.contactInfo.phone}
                </span>
              )}
              {resumeData.contactInfo.location && (
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <LuMapPinHouse size={11} /> {resumeData.contactInfo.location}
                </span>
              )}
              {resumeData.contactInfo.linkedin && (
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <RiLinkedinLine size={11} /> {resumeData.contactInfo.linkedin}
                </span>
              )}
              {resumeData.contactInfo.github && (
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <LuGithub size={11} /> {resumeData.contactInfo.github}
                </span>
              )}
              {resumeData.contactInfo.website && (
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <LuRss size={11} /> {resumeData.contactInfo.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BODY - Two columns */}
      <div className="grid grid-cols-12 gap-0">

        {/* LEFT SIDEBAR */}
        <div className="col-span-4 px-5 py-5" style={{ backgroundColor: light }}>

          {/* Summary */}
          {resumeData.profileInfo.summary && (
            <div className="mb-5">
              <SectionTitle text="About" accentColor={accent} />
              <p className="text-xs text-gray-600 leading-relaxed">
                {resumeData.profileInfo.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills?.filter(s => s.name).length > 0 && (
            <div className="mb-5">
              <SectionTitle text="Skills" accentColor={accent} />
              {resumeData.skills.filter(s => s.name).map((skill, i) => (
                <SkillBadge key={i} name={skill.name} progress={skill.progress} accentColor={accent} />
              ))}
            </div>
          )}

          {/* Languages */}
          {resumeData.languages?.filter(l => l.name).length > 0 && (
            <div className="mb-5">
              <SectionTitle text="Languages" accentColor={accent} />
              {resumeData.languages.filter(l => l.name).map((lang, i) => (
                <SkillBadge key={i} name={lang.name} progress={lang.progress} accentColor={accent} />
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education?.filter(e => e.degree).length > 0 && (
            <div className="mb-5">
              <SectionTitle text="Education" accentColor={accent} />
              {resumeData.education.filter(e => e.degree).map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="text-xs font-semibold text-gray-800">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Interests */}
          {resumeData.interests?.filter(i => i).length > 0 && (
            <div>
              <SectionTitle text="Interests" accentColor={accent} />
              <InterestSection interests={resumeData.interests} />
            </div>
          )}
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="col-span-8 px-6 py-5">

          {/* Work Experience */}
          {resumeData.workExperience?.filter(w => w.company).length > 0 && (
            <div className="mb-5">
              <SectionTitle text="Work Experience" accentColor={accent} />
              {resumeData.workExperience.filter(w => w.company).map((work, i) => (
                <div key={i} className="mb-4 pl-3 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{work.role}</p>
                      <p className="text-xs font-medium" style={{ color: accent }}>{work.company}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                      {formatYearMonth(work.startDate)} – {formatYearMonth(work.endDate)}
                    </span>
                  </div>
                  {work.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{work.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects?.filter(p => p.title).length > 0 && (
            <div className="mb-5">
              <SectionTitle text="Projects" accentColor={accent} />
              {resumeData.projects.filter(p => p.title).map((project, i) => (
                <div key={i} className="mb-3">
                  <ProjectInfo
                    title={project.title}
                    description={project.description}
                    githubLink={project.github}
                    liveDemoUrl={project.liveDemo}
                    bgColor={themeColors[3]}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {resumeData.certification?.filter(c => c.title).length > 0 && (
            <div>
              <SectionTitle text="Certifications" accentColor={accent} />
              <div className="grid grid-cols-2 gap-2">
                {resumeData.certification.filter(c => c.title).map((cert, i) => (
                  <div key={i} className="p-2 rounded-lg border border-gray-100"
                    style={{ backgroundColor: light }}>
                    <p className="text-xs font-semibold text-gray-800">{cert.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{cert.issuer}</p>
                      {cert.year && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: accent }}>
                          {cert.year}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
