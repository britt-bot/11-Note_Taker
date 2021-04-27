// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
const fs = require('fs');
const router = require('express').Router();
const uuid = require('uuid');


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
        const newNote = {
            id: uuid.v4(), // addition of the new uuid into req.body
            title: req.body.title,
            text: req.body.text,
        };
        let newNotes = previousNotes.concat([newNote]);
        // let newNotes = previousNotes.concat([req.body]); // immutable
        console.log(previousNotes);
        fs.writeFile('db/db.json',JSON.stringify(newNotes), (err) => {
            err ? console.log(err) : res.json(req.body);
        });
    })  
});

router.delete('/notes/:id', (req,res) => {
    // get user input from parameters = id
    const userInput = req.params.id;

    fs.readFile('db/db.json', "utf8", function(err, data){
        console.log(data);
        const previousNotes = JSON.parse(data);
        const newNotes = [];
        for (var i = 0; i < previousNotes.length; i++) {
            if (userInput === previousNotes[i].id) {
                previousNotes.splice(i,1);
                let noteJSON = JSON.stringify(previousNotes, null, 2);
                    fs.writeFile('db/db.json', noteJSON, (err) => {
                        err ? console.log(err) : res.json(req.body);
                        console.log("Note has been deleted!");
                    });
            }
        }
    });    
});

// ROUTING
module.exports = router;