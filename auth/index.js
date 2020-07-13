const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error')

const secret = config.jwt.secret;

function sign(data) {
    // data = JSON.parse(JSON.stringify(data));
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log("aquiii", decoded);

        console.log(owner)
        // Comprobar si es no propio
        if (decoded.data.id !== owner) {
            throw error('No puedes hacer esto', 401)
            // throw new Error('No puedes hacer esto');
        }
    },

    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
        // throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
        // throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    console.log(authorization)
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded.data;

    return decoded;
}

module.exports = {
    sign,
    check
};

/*
El método indexOf() devuelve la posición de la primera aparición de un valor 
especificado en una cadena.

Los caracteres de una cadena se indexan de izquierda a derecha.
El índice del primer carácter es 0, y el índice del último carácter
de una cadenallamada nombreCadena es nombreCadena.length - 1.
*/