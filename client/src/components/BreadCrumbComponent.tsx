import { Link, useParams } from "react-router-dom";
import { folderData } from "../types";

const BreadCrumbComponent = ({ folder }: { folder: folderData }) => {
  const { name } = useParams();

  return (
    <div className="flex">
      {folder?.breadCrumb?.map((bread, index) => (
        <Link
          to={`/folders/${bread.id}/${bread.name}`}
          className="flex text-gray-500 "
          key={bread.id}
        >
          <p
            className={`${
              bread.name === name
                ? "text-purple-500 font-bold"
                : "text-gray-500"
            }`}
          >
            {bread.name}{" "}
          </p>

          {index + 1 === folder?.breadCrumb?.length ? (
            ""
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumbComponent;
