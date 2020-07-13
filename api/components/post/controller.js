const nanoid = require('nanoid');

const TABLA = 'post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(req) {
        const post = {
            text: req.body.text,
            user: req.body.user
        }

        if (req.body.id) {
            post.id = req.body.id;
        } else {
            post.id = nanoid();
        }

        return store.upsert(TABLA, post);
    }

    return {
        list,
        get,
        upsert
    };
}