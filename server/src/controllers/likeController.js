import prisma from "../config/prisma.js";

export const toggleLike = async (req, res) => {
  try {
    const { pinId } = req.params;

    const existingLike =
      await prisma.like.findFirst({
        where: {
          userId: req.user.id,
          pinId,
        },
      });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.json({
        liked: false,
      });
    }

    await prisma.like.create({
      data: {
        userId: req.user.id,
        pinId,
      },
    });

    res.json({
      liked: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};