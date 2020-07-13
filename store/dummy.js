const db = {
    'user': [
        { id: '1', name: 'Deyvis Neyser' },
        // { id: '2', name: 'Marivi Valdez' }
    ],
};

async function list(tabla) {
    return db[tabla] || [];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }

    db[tabla].push(data);
    // return db['user'];

    console.log(db);
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q); //resultado = [username], permite convertir en un array a los elementos de un objeto
    // console.log(keys);
    let key = keys[0];

    return col.filter(item => item[key] === q[key])[0] || null; //Aqui le digo item.username = q.username / y solo obtengo el primer objeto como resutado
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}