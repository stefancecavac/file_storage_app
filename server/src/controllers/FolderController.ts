import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllFolders = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: userId,
        parentFolderId: null,
      },
      include: {
        _count: {
          select: {
            file: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
        subfolders: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    res.status(200).json(folders);
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const getSingleFolder = async (req: Request, res: Response) => {
  const folderId = parseInt(req.params.folderId);

  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        parentFolder: {
          select: {
            id: true,
            name: true,
            parentFolderId: true,
          },
        },
        subfolders: {
          select: {
            id: true,
            createdAt: true,
            name: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        file: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!folder) {
      return res.status(404).json({ message: `Folder not found` });
    }

    const breadCrumb = [];
    let currentBreadcrumbFolder: {
      id: number;
      name: string;
      parentFolderId: number | null;
    } | null = {
      id: folder.id,
      name: folder.name,
      parentFolderId: folder.parentFolder?.id || null,
    };

    while (currentBreadcrumbFolder) {
      breadCrumb.unshift({
        id: currentBreadcrumbFolder.id,
        name: currentBreadcrumbFolder.name,
      });

      if (currentBreadcrumbFolder.parentFolderId) {
        currentBreadcrumbFolder = await prisma.folder.findUnique({
          where: {
            id: currentBreadcrumbFolder.parentFolderId,
          },
          select: {
            id: true,
            name: true,
            parentFolderId: true,
          },
        });
      } else {
        currentBreadcrumbFolder = null;
      }
    }

    res.status(200).json({ ...folder, breadCrumb });
  } catch (error) {
    console.log(`Something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const createFolder = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { name } = req.body;
  const folderId = parseInt(req.body.folderId);

  try {
    await prisma.folder.create({
      data: {
        name: name,
        userId: userId,
        parentFolderId: folderId ? folderId : null,
      },
    });

    res.status(200).json({ message: "Folder created successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const deleteFolder = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    async function RecursiveDelete(id: number) {
      const subfolders = await prisma.folder.findMany({
        where: {
          parentFolderId: id,
        },
      });

      for (const subfolder of subfolders) {
        await RecursiveDelete(subfolder.id);
      }

      await prisma.file.deleteMany({
        where: { folderId: id },
      });

      await prisma.folder.deleteMany({
        where: { id: id },
      });
    }
    await RecursiveDelete(id);
    res.status(200).json({ message: "Folder deleted successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const moveFolder = async (req: Request, res: Response) => {
  const { folderId, parentFolderId } = req.body;

  if (folderId === parentFolderId) {
    return res.status(400).json({ message: "invalid action" });
  }

  try {
    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        parentFolderId: parentFolderId,
      },
    });

    res.status(200).json({ message: "Folder moved successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

export {
  getAllFolders,
  createFolder,
  deleteFolder,
  getSingleFolder,
  moveFolder,
};
