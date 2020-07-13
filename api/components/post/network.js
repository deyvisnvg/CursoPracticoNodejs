const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);

// functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

router.get('/:id', (req, res, next) => {
    let { id } = req.params;
    Controller.get(id)
        .then(user => {
            response.success(req, res, user, 200);
        })
        .catch(next)
})

router.post('/', upsert);
router.put('/', upsert);

function upsert(req, res, next) {
    Controller.upsert(req)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(next)
}

module.exports = router;