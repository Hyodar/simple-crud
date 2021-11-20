
const { User } = require("../config/sequelize").getDb();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const APIError = require("../helpers/api_error");

class AuthController {
    async login(req, res, next) {
        console.log("adsasddasdsa");
        const user = await User.findOne({
            where: {
                name: req.body.name
            }
        });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                id: user.id,
            }, "secret", {
                expiresIn: "365d",
            });
            
            return res.status(httpStatus.OK)
                .header("Access-Control-Expose-Headers", "Authorization")
                .header("Authorization", `Bearer ${token}`)
                .send({ token });
        }

        const err = new APIError("Login error", httpStatus.UNAUTHORIZED);
        return next(err);
    }
}

module.exports = AuthController;
