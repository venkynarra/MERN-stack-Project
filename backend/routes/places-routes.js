const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id:'p1',
        title: ' Veritis building',
        description: 'Work building',
        location: {
            lat: 32.8925184,
            lng: -96.976896
        },
        address: '141 Greenway drive',
        creator: 'u1'

    }
];

router.get('/:pid',(req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });
    res.json({place});



});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;

    });
    res.json({place});


});
module.exports = router;
