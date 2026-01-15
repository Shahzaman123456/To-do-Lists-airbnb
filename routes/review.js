import express from 'express'
import wrapAsync from "../utils/wrapeAsync.js";
import {isLoggedIn,validateReview,isReviewAuthor} from '../midleware.js';
import reviewsController from '../Controllers/reviews.js';


const router =express.Router({mergeParams:true});
//post
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewsController.craeteReview));

//Delete reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewsController.deleteReview));

export default router