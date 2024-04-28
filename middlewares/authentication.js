const { validateToken } = require("../service/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req,res,next) => {
        const tokenCookieValue = req.cookie[cookieName]
        if(!tokenCookieValue){
            next()
        }

        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload;
            
        } catch (error) {
            next()
        }
    }
}