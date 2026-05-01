import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    // 1. MUST be "authorization" (lowercase), not "authenticate"
    const authHeader = req.headers.authorization;

    // 2. Check for the space after "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3. Extract the token (this is OUTSIDE the if-statement now)
    const token = authHeader.split(" ")[1];

    // 4. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach the user's ID to the request object
    req.userId = decoded.id;

    // 6. Move to the actual route
    next();
  } catch (error) {
    console.error("🔑 MIDDLEWARE JWT ERROR:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
