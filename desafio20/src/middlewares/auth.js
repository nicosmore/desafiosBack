const auth = async (ctx, next) => {
  if (ctx.request.isAuthenticated()) {
    next();
  }
  else {
    ctx.response.redirect('/');
  }
};

module.exports = auth;