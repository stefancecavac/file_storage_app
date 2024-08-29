import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fileData } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllFiles = (q: string | null, type: string | null) => {
  const fetchAllFiles = async () => {
    const response = await fetch(
      `${BASE_URL}api/files?q=${q ? q : ""}&type=${type ? type : ""}`,
      {
        credentials: "include",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as fileData[];
  };

  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ["files", q, type],
    queryFn: fetchAllFiles,
  });

  return { files, filesLoading };
};

export const useGetAllSearchFiles = (q: string | null, type: string | null) => {
  const fetchAllFiles = async () => {
    const response = await fetch(
      `${BASE_URL}api/search/files?q=${q ? q : ""}&type=${type ? type : ""}`,
      {
        credentials: "include",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as fileData[];
  };

  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ["files", q, type],
    queryFn: fetchAllFiles,
  });

  return { files, filesLoading };
};
export const useUploadFiles = () => {
  const queryClient = useQueryClient();

  const uploadFiles = async (files: FormData) => {
    const response = await fetch(`${BASE_URL}api/files`, {
      method: "POST",
      body: files,
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };
  const {
    mutate,
    isPending: pendingUpload,
    isSuccess: successUpload,
    error: errorUpload,
    reset: uploadReset,
  } = useMutation({
    mutationKey: ["files"],
    mutationFn: uploadFiles,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });

  return { mutate, pendingUpload, successUpload, errorUpload, uploadReset };
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  const deleteFile = async (id: number | undefined) => {
    const response = await fetch(`${BASE_URL}api/files/delete`, {
      method: "DELETE",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: deleteFileMutation } = useMutation({
    mutationKey: ["files"],
    mutationFn: deleteFile,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });

  return { deleteFileMutation };
};

export const useMoveFile = () => {
  const queryClient = useQueryClient();

  const moveFile = async ({
    fileId,
    folderId,
  }: {
    fileId: number | undefined;
    folderId: number | undefined;
  }) => {
    const response = await fetch(`${BASE_URL}api/files/move`, {
      method: "PATCH",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ fileId, folderId }),
      credentials: "include",
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: moveFileMutation } = useMutation({
    mutationKey: ["files"],
    mutationFn: moveFile,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
    },
  });

  return { moveFileMutation };
};
