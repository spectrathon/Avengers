import clerk from '../clerkconfig.js'
const isUser = async (req, res, next) => {
    try {
        const userId = req.headers.userid;
        if (!userId) {
            return res.json({ success: false, msg: "Are you logged In" });
        }
        const user = await clerk.users.getUser(userId);
        console.log(user);

        if (user && user.id === userId) {
            req.userId = userId;
            req.isAdmin = false;
            next();
        } else {
            return res.json({ success: false, msg: "Not a registered User" });
        }
    } catch (error) {
        // console.error("Error in isUser middleware:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};
export default isUser;