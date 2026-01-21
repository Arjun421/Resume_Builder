import React, { useRef, useState, useEffect } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}
      >
        {text}
      </span>
      <h2 className="relative text-sm font-semibold">{text}</h2>
    </div>
  );
};

const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  console.log('🎨 TemplateOne received resumeData:', resumeData);
  
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800); // Default value
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
    setBaseWidth(actualBaseWidth); // Get the actual base width
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
  <div
    ref={resumeRef}
    className="p-3 bg-white"
    style={{
      transform: containerWidth > 0 ? `scale(${scale})` : "none",
      transformOrigin: "top left",
      width: containerWidth > 0 ? `${baseWidth}px` : "auto",
      height: "auto",
    }}
  >
    <div className="grid grid-cols-12 gap-8">
      {/* LEFT COLUMN */}
      <div
        className="col-span-4 py-10"
        style={{ backgroundColor: themeColors[0] }}
      >
        <div className="flex flex-col items-center px-2">
          {/* Profile Image */}
          <div
            className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: themeColors[1] }}
          >
            {resumeData.profileInfo.profilePreviewUrl ? (
              <img
                src={resumeData.profileInfo.profilePreviewUrl}
                className="w-[90px] h-[90px] rounded-full object-cover"
                alt="profile"
              />
            ) : (
              <div
                className="w-[90px] h-[90px] rounded-full flex items-center justify-center"
                style={{ color: themeColors[4] }}
              >
                <LuUser size={40} />
              </div>
            )}
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold mt-3 text-center">
            {resumeData?.profileInfo?.fullName || "No Name Provided"}
          </h2>


          <p className="text-sm text-center">
            {resumeData?.profileInfo?.designation || "No Designation"}
          </p>
        </div>
        <div className="my-6 mx-6">
            <div className=" flex flex-col gap-4">
              <ContactInfo
              icon={<LuMapPinHouse/>}
              iconBG={themeColors[3]}
              value={resumeData.contactInfo.location}
              />
            </div>
        </div>
      </div>
      <div className="col-span-8 pt-10 mr-10 pb-5">

      </div>


      
    </div>
  </div>
);

};

export default TemplateOne;
