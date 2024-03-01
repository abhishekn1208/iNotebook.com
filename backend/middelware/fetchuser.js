var jwt = require("jsonwebtoken");
JWT_SECRET = "Abhishek$Nigam";

const fetchuser = (req, res, next) => {
  //Get the user from the JWT token and add ID to req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate user with valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please verify user's with a valid token" });
  }
};
module.exports = fetchuser;
