import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

type Filter = {
  name?: { contains: string } & { mode: "insensitive" };
  type?: { contains: string };
};

const getAllSearchFolders = async (req: Request, res: Response) => {
  const q = req.query.q as string | undefined;
  const { userId } = req.user;

  let filter: Filter = {};

  if (q) {
    filter.name = { contains: q, mode: "insensitive" };
  }

  try {
    const folders = await prisma.folder.findMany({
      where: {
        ...filter,
        userId: userId,
      },
    });

    res.status(200).json(folders);
  } catch (error) {
    console.log(`something went wrong`, error);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const getAllSearchFiles = async (req: Request, res: Response) => {
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

export { getAllSearchFolders, getAllSearchFiles };
