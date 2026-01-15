import User from '../models/user.js'


const rendersignupFrom=(req,res)=>{
    res.render("users/signup.ejs");
}


const postSignup=async (req, res,next) => {
try {
        let {username, email, password} = req.body;
const newUser = new User({username, email}); 
  const  registerUser=await User.register(newUser,password);
  req.login(registerUser,(err)=>{
    if(err){
        return next(err)
    }
     req.flash("success", "Welcome to Airbnb!");
  res.redirect("/listings");
  })
}catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup"); 
}
}

const renderLoginForm= (req, res) => {
    res.render("users/login.ejs");
}

const Login=async (req, res) => {
   req.flash("success","Welcome to airbnb,you are loggind in");
   let redirectUrl=res.locals.redirectUrl  ||"/listings"
   res.redirect(redirectUrl)
}


const Logout= (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out.");
        res.redirect("/listings");
    });
}

export default {rendersignupFrom, postSignup,renderLoginForm,Login,Logout}