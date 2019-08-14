const Product = require("../models/product")
const User = require("../models/user")

const create = async (req) => {
    let { merk, type, price, author } = req.body
    price = parseInt(price)
    var insert_data = {
        merk,
        type,
        price,
        author
    }

    let data = new Product(insert_data)

    try {
        await data.save()

        return data
    } catch(err) {
        throw err
    }
}

const getAll = async () => {
    try {
        let query = await Product.find({})
          .populate([
            {
              path: 'author',
              model: User
            }
          ])
        
        
           .exec()
        let data = query.map((v, i) => {
            return {
                merk: v.merk,
                type: v.type,
                price: v.price,
                author: v.author
           }
        })

        return data
    } catch(err) {
        throw err
    }
}

const getDetail = async (id) => {
    try {
        let query = await Product.find({_id: id}).exec()
        let data = query.map((v, i) => {
            return {
                merk: v.merk,
                type: v.type,
                price: v.price,
                author: v.author
            }
        })
        return data
    } catch(err) {
        throw err
    }
}

const update = async (id, updated_data) => {
    let { merk, type, price, author, fresh } = updated_data
    let opts = {
        new: fresh === "true" ? true : false
    }
    let data = {
        merk,
        type,
        price,
        author
    }

    try {
        let query = await Product.findOneAndUpdate({
            _id: id
        }, data, opts).exec()

        return query
    } catch(err) {
        throw err
    }
}

const destroy = async (id) => {
    try {
        let query = await Product.findOneAndDelete({
            _id: id
        }).exec()

        return query
    } catch(err) {
        throw err
    }
}

module.exports = {
    create,
    getAll,
    getDetail,
    update,
    destroy
}
