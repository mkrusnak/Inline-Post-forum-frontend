const MarketPage = () => {

    const Listing = require("../models/Listing.model");

    const addListingController = (req, res, next) => {
      const {
        makeModel,
        odometr,
        year,
        description,
        price,
        imageUrl,
        knownFlaws,
        tradeOk,
      } = req.body;
    
      if (
        (!makeModel,
        !odometr,
        !year,
        !description,
        !price,
        !imageUrl,
        !tradeOk,
        !knownFlaws)
      ) {
        return res.status(400).json({
          error: {
            message: "Can't have empty fields",
          },
        });
      }
    
      Listing.create({
        owner: req.payload._id,
        makeModel,
        odometr,
        description,
        year,
        price,
        imageUrl,
        knownFlaws,
        tradeOk,
      })
        .then((newListing) => {
          console.log("here is new listing", newListing);
        })
        .catch((err) => console.log(err));
    };
    
    module.exports = { addListingController };
    


    return(
        <div>
            <h1>THIS IS MARKETPLACE</h1>
        </div>
    )
}

export default MarketPage;