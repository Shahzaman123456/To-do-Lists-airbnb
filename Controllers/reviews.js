import Review from "../models/review.js";
import Listing from '../models/listing.js';



const craeteReview=async (req, res) => { 
    let listing = await Listing.findById(req.params.id).populate("reviews");
    let newReview = new Review(req.body.review);
     newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success"," New Review Created"); 
res.redirect(`/listings/${listing._id}`)
}


const deleteReview=async(req,res)=>{
  let {id,reviewId}=req.params
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted"); 
  res.redirect(`/listings/${id}`)
}

export default {craeteReview, deleteReview}