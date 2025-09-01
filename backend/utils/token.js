import jwt from "jsonwebtoken";

export const getToken = async (userId) => {
    try {
        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (error) {
        console.log("Token generation failed", error);
        throw new Error("Token generation failed");
    }

}
