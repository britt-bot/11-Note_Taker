// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
const fs = require('fs');
const router = require('express').Router();


router.get('/notes', function(req,res){
    fs.readFile('db/db.json', "utf8", function(err, data) {
        res.json(JSON.parse(data));
    })  
});

router.post('/notes', (req,res) => {
    fs.readFile('db/db.json', "utf8", function(err, data){
        console.log(data);
        const previousNotes = JSON.parse(data);
        // previousNotes.push(req.body); // mutable
        let newNotes = previousNotes.concat([req.body]); // immutable
        console.log(previousNotes);
        fs.writeFile('db/db.json',JSON.stringify(newNotes), (err) => {
            err ? console.log(err) : res.json(req.body);
        });
    })  
});

// ROUTING
module.exports = router;