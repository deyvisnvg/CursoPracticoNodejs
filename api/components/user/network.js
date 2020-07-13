
const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', (req, res, next) => {
    Controller.list()
        .then(lista => {
            response.success(req, res, lista, 200);
        })
        .catch(next)
    // .catch(err => {
    //     response.error(req, res, err.message, 500);
    // })

})

router.get('/:id', (req, res, next) => {
    let { id } = req.params;
    Controller.get(id)
        .then(user => {
            response.success(req, res, user, 200);
        })
        .catch(next)
    // .catch(err => {
    //     response.error(req, res, err.message, 500);
    // })
})


router.post('/', upsert);
router.put('/', secure('update'), upsert);

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(next)
    // .catch((err) => {
    //     response.error(req, res, err.message, 500);
    // });

}

router.post('/follow/:id', secure('follow'), follow);

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

router.get('/:id/following', following);

function following(req, res, next) {
    return Controller.following(req.params.id)
        .then((data) => {
            return response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;


// const express = require('express');

// const secure = require('./secure');
// const response = require('../../../network/response');
// const Controller = require('./index');

// const router = express.Router();

// // Routes
// router.get('/', list)
// router.get('/:id', get);
// router.post('/', upsert);
// router.put('/', secure('update'), upsert);

// // Internal functions
// function list(req, res, next) {
//     Controller.list()
//         .then((lista) => {
//             response.success(req, res, lista, 200);
//         })
//         .catch(next);
// }

// function get(req, res, next) {
//     Controller.get(req.params.id)
//         .then((user) => {
//             response.success(req, res, user, 200);
//         })
//         .catch(next);
// }

// function upsert(req, res, next) {
//     Controller.upsert(req.body)
//         .then((user) => {
//             response.success(req, res, user, 201);
//         })
//         .catch(next);
// }

// module.exports = router;