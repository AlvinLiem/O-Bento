async function authorizationAdminOnly(req, res, next) {
  try {
    if (req.user.role === `Staff`) {
        throw { name: `Forbidden Access` };
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authorizationAdminOnly,
};
