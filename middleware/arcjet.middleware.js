import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Try again later.",
        });
      }

      

      return res.status(403).json({
        success: false,
        message: "Request blocked by security rules.",
      });
    }

    next();
  } catch (err) {
    console.error("Arcjet error:", err);
    return res.status(500).json({
      success: false,
      message: "Security service failure",
    });
  }
};

export default arcjetMiddleware;
