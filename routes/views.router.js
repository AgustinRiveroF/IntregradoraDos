import { Router } from "express";

const router = Router()

router.get("/login", (req, res) =>{
    res.render("login")
});

router.get("/signup", (req, res) =>{
    res.render("signup")
});

router.get("/profile", (req, res) =>{
    res.render("profile",{ user: req.session.user })
});


export default router