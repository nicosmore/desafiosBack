const express = require("express");
const auth = require("../middlewares/auth");
const users = require('../db/data/users.json')

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await req.session.user;
  if (user) {
    return res.redirect("/form");
  } else {
    return res.redirect("/login.html");
  }
});

router.get("/form", auth, async (req, res) => {  
const userData = await req.session.user; 
  res.redirect("form.html");
});

router.get("/logout", auth, async (req, res) => {
  const nameUser = await req.session.user.name;
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.clearCookie("my-session");
      } else {
        res.render("logoutUser", { nameUser });
        res.clearCookie("my-session");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/error", (req, res) => {
  res.status(500).redirect("error.html");
});

router.get("/unauthorized", (req, res) => {
  res.status(401).sendFile(__dirname + "/public/unauthorized.html");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) return res.redirect("/error");
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log("Sesion error=>", err);
      return res.redirect("/error");
    }
    res.redirect("/form");
  });
});

module.exports = router;
