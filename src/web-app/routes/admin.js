const express = require('express');
const adminRouter = express.Router();
const Admin = require('../models/admin')
adminRouter.get('/', function (req, res) {
    Admin.find(function (err, admins) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(admins);
        }
    });
});
adminRouter.get(('/:id'), function (req, res) {
    let id = req.params.id;
    Admin.findById(id, function (err, admin) {
        if (err) {
            res.status(400).send("Unable to find admin of given id")
        } else {
            res.json(admin);
        }
    });
});
adminRouter.post(('/'), function (req, res) {
    Admin.findOne({username: req.body.username},function(err,admin){
        if(admin != null){
            res.status(400).send('Error');
            return;
        }
        else{
            let admin = new Admin(req.body);
            admin.save().then(admin => {
            res.status(200).send(true);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Error');
        });
        }
    })
    
});
adminRouter.delete(('/:id'), function (req, res) {
    let id = req.params.id;
    Admin.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Error');
        } else {
            res.status(200).send(true);
        }
    });
});
adminRouter.put('/:id', function (req, res) {
    let id = req.params.id;
    Admin.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            res.status(400).send('Unable to update admin');
        } else {
            res.status(200).send(true);
        }
    });
});
module.exports = adminRouter;