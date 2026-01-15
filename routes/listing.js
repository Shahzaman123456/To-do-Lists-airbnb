import express from 'express'
import wrapAsync from "../utils/wrapeAsync.js";
import listingController from '../Controllers/listing.js';
import Listing from "../models/listing.js";
import { isLoggedIn,isOwner,validateListing } from '../midleware.js';
import multer from "multer";
import { storage} from '../CloudConfig.js';
const upload = multer({storage});
const router =express.Router();

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single( "listing[image]"),validateListing,wrapAsync(listingController.createListing) );


//New Listing Route
router.get("/new",isLoggedIn,listingController.renderNewForm)


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))


export default router