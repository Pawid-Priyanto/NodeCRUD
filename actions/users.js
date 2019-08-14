const User = require("../models/user")

const create = async (req) => {
    let { name, address, phone } = req.body
    phone = parseInt(phone)
    var insert_data = {
        name,
        address,
        phone
    }

    let data = new User(insert_data)

    try {
        await data.save()

        return data
    } catch(err) {
        throw err
    }
}

const getAll = async () => {
    try {
        let query = await User.find({}).exec()
        let data = query.map((v, i) => {
            return {
                name: v.name,
                address: v.address,
                phone: v.phone
            }
        })

        return data
    } catch(err) {
        throw err
    }
}

const getDetail = async (id) => {
    try {
        let query = await User.find({_id: id}).exec()
        let data = query.map((v, i) => {
            return {
                name: v.name,
                address: v.address,
                phone: v.phone
            }
        })
        return data
    } catch(err) {
        throw err
    }
}

const update = async (id, updated_data) => {
    let { name, address, phone, fresh } = updated_data
    let opts = {
        new: fresh === "true" ? true : false
    }
    let data = {
        name,
        address,
        phone
    }

    try {
        let query = await User.findOneAndUpdate({
            _id: id
        }, data, opts).exec()

        return query
    } catch(err) {
        throw err
    }
}

const destroy = async (id) => {
    try {
        let query = await User.findOneAndDelete({
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
