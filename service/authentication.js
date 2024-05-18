const JWT = require("jsonwebtoken")

const secret = "3412r6tyurfvfey7whvbjhih"

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        profileImageURL: user.profileImage,
        role: user.role,
        name: user.fullName,
    }

    const token = JWT.sign(payload, secret);
    return token
}


function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;

}

module.exports = {
    createTokenForUser,
    validateToken,
}
