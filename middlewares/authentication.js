const { validateToken } = require("../service/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next(); // Return here to exit the middleware if no token is found
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            return next(); // Call next only if token validation succeeds
        } catch (error) {
            return next(error); // Pass the error to the error handling middleware
        }
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
