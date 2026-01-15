 
 import Listing from "../models/listing.js";
 import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});


 const index = async (req, res) => {
  try {
    const { q, category } = req.query;
    let allListings;

    let filter = {};

    if (q && q.trim() !== "") {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    allListings = await Listing.find(filter);

    res.render("listings/index", {
      allListings,
      category: category || "",
      q: q || "",
    });

  } catch (error) {
    console.log("Fetching error", error);
    res.status(500).send("Error fetching listings");
  }
};


const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

const showListing=async (req,res,next)=>{  
let {id}=req.params
 const listing =await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
 if(!listing){  
    req.flash("error","Listing not Found"); 
   return  res.redirect("/listings")
 }else{
 res.render("listings/show.ejs",{listing})
 }
}

const createListing= async (req,res,next)=>{
   let response=await  geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
  
   let url=req.file.path
    let filename=req.file.filename
const newListing= new Listing(req.body.listing)
newListing.owner=req.user._id
newListing.image={url,filename}
newListing.geometry=response.body.features[0].geometry; 
let savedListing= await newListing.save();
// console.log(savedListing);
req.flash("success","New Listing Created!"); 
res.redirect("/listings") 
}


const renderEditForm=async (req,res)=>{
let {id}=req.params
const listing=await Listing.findById(id)
if(!listing){  
    req.flash("error","Listing not Found"); 
    return res.redirect("/listings")
 }
 let orlImageUrl = listing.image.url;
 orlImageUrl=orlImageUrl.replace("/uploads","/uploads/w_250")

req.flash("success","Listing Edited"); 
res.render("listings/edit.ejs",{listing,orlImageUrl})
}

const updateListing=async (req,res)=>{
let {id}=req.params
let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing})
if(typeof req.file !=="undefined"){
    let url=req.file.path
    let filename=req.file.filename
    listing.image={url,filename}
    await listing.save()
}
req.flash("success","Listing Updated!"); 
res.redirect(`/listings/${id}`)
}

const deleteListing= async(req,res)=>{
   let {id}=req.params
  let deletelisting= await Listing.findByIdAndDelete(id)
  req.flash("success","Listing Deleted!"); 
  res.redirect("/listings")
}
    
export default {index,renderNewForm,showListing,createListing,renderEditForm,updateListing,deleteListing}