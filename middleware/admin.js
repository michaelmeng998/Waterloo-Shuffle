function admin(req, res, next) {
  //401 unauthrorized
  //403 forbidden
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
}

module.exports = admin;
