const db = require('./db')
const authentication = require('./authentication')
const cors = require('cors')

module.exports = function(app){
    app.use(cors())

    // loads all users patches
    app.get('/my-patches', authentication.authenticateToken, async (req, res) => {
        const patches = await db.getMyPatches(req.username)
        res.send(patches)
    })

    // gets patch by id
    app.get('/patch', authentication.authenticateToken, async (req, res) => {
        const patch = await db.getPatch(req.query.id)
        res.send(patch)
    })

    // creates new patch
    app.post('/new-patch', authentication.authenticateToken, async (req, res) => {		
        const status = await db.newPatch(req.username)
        res.sendStatus(status)
    })
    
    // changes patch name by id
    app.post('/update-patch-name', authentication.authenticateToken, async (req, res) => {		
        const patchID = req.body.patchID
        const newPatchName = req.body.newPatchName	
        db.updatePatchName(patchID, newPatchName)
    })
    
    // changes patch data by id
    app.post('/update-patch', authentication.authenticateToken, async (req, res) => {
        console.log(req.body);
        await db.updatePatch(req.body.id, req.body)
        res.sendStatus(200)
    })
}
