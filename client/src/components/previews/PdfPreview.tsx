import { fileData } from "../../types";

const PdfPreview = ({ file }: { file: fileData }) => {
  const fileUrl = `http://localhost:4000/uploads/${encodeURIComponent(
    file.url.split("uploads/")[1]
  )}`;

  return (
    <iframe
      src={fileUrl}
      width={800}
      height={700}
      style={{ border: "none" }}
      title="PDF Preview"
    />
  );
};

export default PdfPreview;
