const bcrypt = require('bcryptjs')
const session = require('express-session')

module.exports = {
    register: async ( req, res ) => {
        const {username, password, isAdmin } = req.body
        const db = req.app.get('db')
        const response = await db.get_user(username)
        
        // return res.status(200).send(response)
        try{
            if (response[0]){
                throw res.status(409).send('This username is already taken')
            }
            // this is where we hash the things 
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const newUser = await db.register_user(isAdmin, username, hash)
            const  [user] = newUser
            delete user.hash
            session.user = user 
            const actualUser = session.user
            return res.status(201).send(actualUser)

            
        }catch (err){
            err
        }       
    },

    login: async (req, res) => {
        const { username,password } = req.body
        const db = req.app.get('db')
        const result = await db.get_user(username)
        if(!result[0]){
            return res.status(401).send('This user dosn t exist ')
        }

        const isAuthenticated = bcrypt.compareSync(password, result[0].hash)
        if (!isAuthenticated){
            return res.status(403).send('this.is not your password ma frend ')
        }

        session.user = result[0]
        delete session.user.hash
        return res.status(200).send(session.user)
    },

    logout: (req, res ) => {
        session.user = null
        return res.sendStatus(200);
        // return console.log(session)
    }
    
}