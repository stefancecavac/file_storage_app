import { fileData } from "../../types";
import ImagePreview from "./ImagePreview";
import { motion } from "framer-motion";
import MicrosoftPreview from "./MicrosoftPreview";
import PdfPreview from "./PdfPreview";

const Preview = ({
  file,
  setPreview,
}: {
  file: fileData;
  setPreview: (value: boolean) => void;
}) => {
  const fileType = file.name.split(".").pop()?.toLowerCase();

  const renderPreview = () => {
    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImagePreview file={file} />;
      case "pdf":
        return <PdfPreview file={file}></PdfPreview>;
      case "doc":
      case "docx":
      case "xls":
      case "xlsx":
      case "ppt":
      case "pptx":
        return <MicrosoftPreview file={file}></MicrosoftPreview>;
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500/50 flex flex-col items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg overflow-hidden p-1"
      >
        <svg
          onClick={() => setPreview(false)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 hover:cursor-pointer rounded-full  hover:bg-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        {renderPreview()}
      </motion.div>
    </motion.div>
  );
};

export default Preview;
