import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.admin_token;
        if (!token) {
            return res.json({ success: false, msg: "Access denied" });
        }
        
        const admin = jwt.verify(token, process.env.ADMIN_KEY);
        if (admin && admin.isAdmin) {
            req.isAdmin = true;
            next();
        } else {
            return res.json({ success: false, msg: "Token Invalid Access denied" });
        }
    } catch (error) {
        // console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

export default isAdmin;
