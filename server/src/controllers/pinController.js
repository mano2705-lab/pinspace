import prisma from "../config/prisma.js";

export const createPin = async (req, res) => {
  try {

    const { title, description } = req.body;

    const imageUrl = req.file.path;

    const pin = await prisma.pin.create({
      data: {
        title,
        description,
        imageUrl,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Pin created successfully",
      pin,
    });
  } catch (error) {
  console.error("UPLOAD ERROR:");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

export const getAllPins = async (req, res) => {
  try {
    const pins = await prisma.pin.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      pins,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserPins = async (req, res) => {
  try {
    const { id } = req.params;

    const pins = await prisma.pin.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      pins,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const searchPins = async (req, res) => {
  try {
    const { q } = req.query;

    const pins = await prisma.pin.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      pins,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deletePin = async (req, res) => {
  try {
    const { id } = req.params;

    const pin = await prisma.pin.findUnique({
      where: {
        id,
      },
    });

    if (!pin) {
      return res.status(404).json({
        success: false,
        message: "Pin not found",
      });
    }

    if (pin.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await prisma.pin.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pin deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};