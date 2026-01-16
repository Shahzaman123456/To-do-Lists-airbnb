import './env.js'
import express from "express"
import mongoose from "mongoose"
import path from 'path'
import { fileURLToPath } from "url";
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'
import ExpressError from "./utils/ExpressError.js";
import listingRouter from './routes/listing.js'
import reviewRouter from './routes/review.js'
import session, { Cookie } from "express-session";
import MongoStore from 'connect-mongo';
import flash from 'connect-flash'
import passport from "passport";
import LocalStrategy from 'passport-local'
import User from './models/user.js'
import userRouter from './routes/user.js'


const app = express();


const DataBaseurl = process.env.DATABASE_URL
console.log(DataBaseurl)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

main().then(() => {
    console.log("connected to DB")
}).catch(err => {
    console.log("Databse error", err)
})

async function main() {
    await mongoose.connect(DataBaseurl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))


app.use((req, res, next) => {
  res.locals.q = req.query.q || "";
  next();
});

const store = MongoStore.create({ 
    mongoUrl: DataBaseurl,
    crypto:{secret:process.env.SECRET || 'fallbackSecretDoNotUseThisInProduction'},
    touchAfter:24*3600,
 });

store.on("error", ()=>{
    console.log("MongoStore Session error:", err);
});

//session
const sessionOption={
    store,
    secret:process.env.SECRET || 'fallbackSecretDoNotUseThisInProduction',
    resave:false,
    saveUninitialized:true,
    cookie:{
expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
maxAge:7 * 24 * 60 * 60 * 1000,
httpOnly:true
    }
}


//session and flash midleware
app.use(session(sessionOption));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//midleware of success and falure
app.use((req,res,next)=>{
    res.locals.currUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


//with using express router
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter)

//error handling
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    res.status(statusCode).render("error.ejs", { err });
});

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
