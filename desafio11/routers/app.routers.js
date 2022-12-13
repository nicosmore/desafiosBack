// @ts-nocheck
const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');

const router = express.Router();


//Routes
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  const user = req.user;
  if (user) {
    return res.redirect('/profile');
  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});

router.get('/profile', auth, async (req, res) => {
  const user = await req.user.name;
  res.render('index', { sessionUser: user, logout: false });
});

router.get('/logout', auth, async (req, res, next) => {
  const user = await req.user.name;
  try {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.clearCookie('my-session');
        res.redirect('/')
      }
      else {
        res.clearCookie('my-session');
        res.render('index', { sessionUser: user ,logout: true});
      }
    })
  }
  catch(err) {
    console.log(err);
  }
});

router.get("/error", (req, res) => {
  res.status(500).redirect("error.html");
});

router.get("/unauthorized", (req, res) => {
  res.status(401).sendFile("unauthorized.html");
});


module.exports = router;