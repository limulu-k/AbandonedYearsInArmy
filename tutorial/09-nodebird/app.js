const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
dotenv.config();
const pageRouter = require("./routers/page");

const app = express();
app.set('port', process.env.PORT || 8080);
app.set("view engine", "html");
nunjucks.configure('views',{
	express: app,
	watch: true,
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRETE));
app.use(session({
	resave: false,
	saveUnitialized: false,
	secrete: process.env.COOKIE_SECRETE,
	cookie: {
		httpOnly: true,
		secure: false,
	}
}));

app.use("/", pageRouter);

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) 
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {ss
	res.locals.message = err.message;
	res.local.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), "번 포트에서 대기중...");
});