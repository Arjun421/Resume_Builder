const CertificationInfo = ({ title, issuer, year, bgColor }) => {
  return (
    <div className="mb-3">
      <h3 className="text-xs font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-xs text-gray-700 font-medium mt-1">
        {issuer}
      </p>

      {year && (
        <div
          className="text-xs font-bold text-gray-800 px-2 py-0.5 inline-block mt-1 rounded"
          style={{ backgroundColor: bgColor }}
        >
          {year}
        </div>
      )}
    </div>
  );
};

export default CertificationInfo;
