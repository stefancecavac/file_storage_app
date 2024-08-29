import { fileData } from "../../types";

const MicrosoftfPreview = ({ file }: { file: fileData }) => {
  const fileUrl = `http://localhost:4000/uploads/${encodeURIComponent(
    file.url.split("uploads/")[1]
  )}`;

  return (
    <iframe
      src={fileUrl}
      width={600}
      height={1000}
      style={{ border: "none" }}
      title="Microsoft Preview"
    />
  );
};

export default MicrosoftfPreview;
