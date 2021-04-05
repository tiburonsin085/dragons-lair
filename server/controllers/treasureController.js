const session = require('express-session')

module.exports = {
    dragonTreasure : async (req, res ) => {
        const db = req.app.get('db')
        const treasure = await db.get_dragon_treasure(1)
        // console.log(session.user)
        return res.status(200).send(treasure)

    },

    getUserTreasure: async ( req, res ) => {
        const db = req.app.get('db')
        const userTreasure = await db.get_user_treasure(session.user.id)
        return res.status(200).send(userTreasure)
    },
    addUserTreasure: async (req,res) => {
        const { treasureURL } = req.body 
        const { id } = session.user
        const db = req.app.get('db')
        const userTreasure = await db.add_user_treasure( treasureURL, id ) 
        return res.status(200).send(userTreasure)
    },

    getAllTreasures: async ( req, res ) => {
        const db = req.app.get('db')
        const result = await db.get_all_treasure()
        return res.status(200).send(result)

    }
}