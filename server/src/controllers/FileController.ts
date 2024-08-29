import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

type Filter = {
  name?: { contains: string } & { mode: "insensitive" };
  type?: { contains: string };
};

const prisma = new PrismaClient();

// getAllFiles controller
const getAllFiles = async (req: Request, res: Response) => {
  const q = req.query.q as string | undefined;
  const type = req.query.type as string | undefined;
  const sort = req.query.sort as string;

  const sortOrder = sort == "asc" ? "asc" : "desc";

  let filter: Filter = {};

  if (q) {
    filter.name = { contains: q, mode: "insensitive" };
  }

  if (type) {
    filter.type = { contains: type };
  }

  const { userId } = req.user;
  try {
    const files = await prisma.file.findMany({
      where: {
        ...filter,
        userId: userId,
        folderId: null,
      },
      orderBy: {
        size: sortOrder,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    res.status(200).json(files);
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

// uploadFile controller
const uploadFile = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const folderId = parseInt(req.body.folderId);
  if (!req.file) {
    return res.status(400).json({ message: `Please provide a file` });
  }
  const extentionIndex = req.file.originalname.lastIndexOf(".");
  const extention = req.file.originalname.slice(extentionIndex);

  const index = req.file.filename.lastIndexOf("-");
  const originalname = req.file.filename.slice(0, index);

  try {
    await prisma.file.create({
      data: {
        folderId: folderId ? folderId : null,
        userId: userId,
        name: originalname,
        mimeType: req.file?.mimetype,
        size: req.file?.size,
        type: extention,
        url: `../../uploads/${req.file.filename}`,
      },
    });

    res.status(200).json({ message: "File created successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

// deletefile contorller
const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const fileExist = await prisma.file.findUnique({
      where: {
        id: id,
      },
    });

    if (!fileExist) {
      return res.status(404).json({ message: "No file with that id" });
    }

    const file = await prisma.file.delete({
      where: {
        id: id,
      },
    });

    const filePath = path.join(
      __dirname,
      "../../uploads",
      file.url.split("/").pop() as string
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "File deleted successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const insertFileIntoFolder = async (req: Request, res: Response) => {
  const { fileId, folderId } = req.body;

  try {
    await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        folderId: folderId,
      },
    });

    res.status(200).json({ message: "File  added to folder successfuly" });
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

export { getAllFiles, uploadFile, deleteFile, insertFileIntoFolder };
