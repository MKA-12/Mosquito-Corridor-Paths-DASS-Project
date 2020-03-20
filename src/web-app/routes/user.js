const express = require('express');
const userRouter = express.Router();
const User = require('../models/user')
userRouter.get('/', function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(users);
        }
    });
});
userRouter.get(('/:id'), function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.status(400).send("Unable to find user of given id")
        } else {
            res.json(user);
        }
    });
});
userRouter.post(('/'), function (req, res) {
    User.findOne({token: req.body.token},function(err,user){
        if(user != null){
            res.status(400).send('Error');
            return;
        }
        else{
            let user = new User(req.body);
            user.save().then(user => {
            res.status(200).send(true);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Error');
        });
        }
    })
    
});
userRouter.delete(('/:id'), function (req, res) {
    let id = req.params.id;
    User.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Error');
        } else {
            res.status(200).send(true);
        }
    });
});
userRouter.put('/:id', function (req, res) {
    let id = req.params.id;
    User.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            res.status(400).send('Unable to update user');
        } else {
            res.status(200).send(true);
        }
    });
});
module.exports = userRouter;