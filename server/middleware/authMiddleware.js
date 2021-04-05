const session = require('express-session')

module.exports = {
    usersOnly: ( req, res, next ) => {
        if(!session.user){
            return res.status(401).send('please login ma bro')


        }
        next ()
    },
    adminsOnly: (req, res, next ) => {
        console.log(session.user)
        if (!session.user.is_admin){
            res.status(403).send('you are not an admin')

        }
        
        next()
    }
}