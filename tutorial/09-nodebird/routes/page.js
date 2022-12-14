const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
	res.local.user = null;
	res.local.followerCount = 0;
	res.local.followingCount = 0;
	res.local.followerIdList = [];
	next();
});

router.get("/profile", (req, res) => {
	res.render("profile", {title: '내정보 - NodeBird'});
});

router.get("/join", (req,res) => {
	res.render("join", {title: '회원가입 - NodeBird'});
})

router.get("/", (req,res,next) => {
	const twits = [];
	res.render("main", {
		
	})
});