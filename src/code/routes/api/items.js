const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//GET request
router.get('/', (req, res) => {
    Item.find()
        // .then((items) =>
        //     console.log(items) res.json(items))
        .then((items) => {
            console.log('Data: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

// POST request
router.post('/', (req, res) => {
    console.log(req.body);
    const newItem = new Item({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity
    });
    newItem.save().then(item => res.json(item));
});

//DELETE request
router.delete('/', (req, res) => {
    console.log(req);
    Item.findById(req.body.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;