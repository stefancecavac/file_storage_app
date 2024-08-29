import { fileData } from "../../types";

const ImagePreview = ({ file }: { file: fileData }) => {
  const imageUrl = `http://localhost:4000/uploads/${encodeURIComponent(
    file.url.split("uploads/")[1]
  )}`;

  console.log(imageUrl);
  return <img src={imageUrl} className="w-[50rem] rounded-lg"></img>;
};

export default ImagePreview;
