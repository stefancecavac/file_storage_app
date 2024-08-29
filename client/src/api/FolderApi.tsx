import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { folderData } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllFolders = () => {
  const fetchAllFOlders = async () => {
    const response = await fetch(`${BASE_URL}api/folders`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as folderData[];
  };

  const { data: folders, isLoading: foldersLoading } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchAllFOlders,
    refetchOnWindowFocus: false,
  });

  return { folders, foldersLoading };
};

export const useGetAllSearchFolders = (q: string | null) => {
  const fetchAllFOlders = async () => {
    const response = await fetch(
      `${BASE_URL}api/search/folders?q=${q ? q : ""}`,
      {
        credentials: "include",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as folderData[];
  };

  const { data: folders, isLoading: foldersLoading } = useQuery({
    queryKey: ["folders", q],
    queryFn: fetchAllFOlders,
  });

  return { folders, foldersLoading };
};

export const useGetSingleFolder = () => {
  const { folderId } = useParams();

  const fetchSingleFolder = async () => {
    const response = await fetch(`${BASE_URL}api/folders/${folderId}`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as folderData;
  };

  const { data: folder, isLoading } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: fetchSingleFolder,
  });

  return { folder, isLoading };
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const createFolder = async ({
    data,
    folderId,
  }: {
    data: folderData;
    folderId: number | undefined;
  }) => {
    const response = await fetch(`${BASE_URL}api/folders/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ ...data, folderId }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as folderData;
  };

  const { mutate: createFolderMutation } = useMutation({
    mutationKey: ["folders"],
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["folder"],
      });
    },
  });

  return { createFolderMutation };
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  const deleteFolder = async (id: number | undefined) => {
    const response = await fetch(`${BASE_URL}api/folders/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ id }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as folderData;
  };

  const { mutate: deleteFolderMutation } = useMutation({
    mutationKey: ["folders"],
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["folder"],
      });
    },
  });

  return { deleteFolderMutation };
};

export const useMoveFolder = () => {
  const queryClient = useQueryClient();
  const moveFolder = async ({
    folderId,
    parentFolderId,
  }: {
    folderId: number | undefined;
    parentFolderId: number | undefined;
  }) => {
    const response = await fetch(`${BASE_URL}api/folders/move`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ folderId, parentFolderId }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as folderData;
  };

  const { mutate: moveFolderMutation } = useMutation({
    mutationKey: ["folders"],
    mutationFn: moveFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["folder"],
      });
    },
  });

  return { moveFolderMutation };
};
