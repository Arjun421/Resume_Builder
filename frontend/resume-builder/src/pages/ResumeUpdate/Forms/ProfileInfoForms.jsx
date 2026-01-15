
import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector";
import Input from "../../../components/Inputs/Input";

const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold">Personal Information</h2>

      <div className="">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />

        <div className="">
          <Input
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={profileData.designation || ""}
            onChange={({ target }) =>
              updateSection("designation", target.value)
            }
            label="Designation"
            placeholder="UI Designer"
            type="text"
          />

          <div className="">
            <label className="">
              Summary
            </label>

            <textarea
              placeholder="Short Introduction"
              className=""
              rows={4}
              value={profileData.summary || ""}
              onChange={({ target }) =>
                updateSection("summary", target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
