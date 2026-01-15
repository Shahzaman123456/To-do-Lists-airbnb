import Listing from "./models/listing.js";
import listingSchema from "./Schema.js";
import ExpressError from "./utils/ExpressError.js";
import { reviewSchema } from "./Schema.js";
import Review from "./models/review.js";


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // ✅ FIXED
    }
    next();
};

const isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

const isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


// validate Listing By Joi
const validateListing= (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errmsg = error.details.map(el => el.message).join(",");
    return next(new ExpressError(400, errmsg));
  }
  next();
}

//validate Reviews 
const validateReview=(req,res,next)=>{
 let {error}=reviewSchema.validate(req.body);
  if(error){
    let errmsg=error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errmsg);
  }else{
    next();
  }
}

export { isLoggedIn, saveRedirectUrl, isOwner, validateListing,validateReview ,isReviewAuthor};