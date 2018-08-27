var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
var Event = require('./Event');

router.post('/', function(req, res){

    Event.create({
        name : req.body.name,
        location : req.body.location,
        date : req.body.date
    },
    function (err, event) {
        if(err) return res.status(500).send("There was a problem adding to the database.");
        res.status(200).send(event);
    });
});

router.get('/', function (req,res){
        Event.find({},function(err,events){
            if (err) return res.status(500).send("There was a Problem finding events.");
            res.status(200).send(events);
        });
});

router.get('/:location',function (req,res){
    Event.findByLocation(req.params.location,
        function (err,event){
            if(err) return res.status(500).send("Something went wrong.");
            if(!event) return res.status(404).send("No Event found");
            res.status(200).send(event);
    });
});

router.put('/:id', function (req, res){
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true},
        function (err, event) {
            if (err) return res.status(500).send("Error in updating event.");
            res.status(200).send(event);
    });
});

router.delete('/:id', function(req,res){
    Event.findByIdAndRemove(req.param.id, function(err,event){
        if (err) return res.status(500).send("problem deleting the event.");
        res.status(200).send("Event "+ event.name +" was deleted.");
    });
});


module.exports = router;
