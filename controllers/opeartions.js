const Product = require('../model/Product')

const sortBy = async (req, res) => {
    console.log(req.query)
    if (req.query.price || req.query.name) {
        try {
            console.log("sort by-", req.query)
            let sortBy = []
            if (req.query.price) 
                 sortBy = await Product.find().sort({ price: 'asc' })
            else
                 sortBy=await Product.find().sort({title:'asc'})
            res.json(sortBy)
        } catch (error) {
            res.json({message:error})
        }
    }
    
}

module.exports = {
    sortBy
}