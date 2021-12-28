const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //false여야지 session에 값을 지정할수 있다.
        maxAge: 1000 * 60 * 60 //쿠키 유효시간
    }
}));

const server = app.listen(3000, () => {
    console.log('Server started, port 3000.');
});

const db = {
    database: 'dev',
    connectionLimit: 10,
    host: '193.122.124.72',
    user: 'root',
    password: '@lchksy275'

};
const dbPool = require('mysql').createPool(db);

app.post('/api/login', async (request, res) => {
    request.session['email'] = 'xs275@naver.com';
    res.send('ok');

});
app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send('ok');
});

const sql = require('./sql.js');

app.post('/api/:alias', async (request, res) => {
    if(!request.session.email){
        return res.status(401).send({
            error:"you need to login"
        });
    }
    try {
        res.send(await req.db(request.params.alias));
    } catch (err) {
        res.status(500).send({
            error: err
        });
    }
});
const req = {
    async db(alias, param = [], where = '') {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
            if (error) {
                if (error.code != 'ER_DUP_ENTRY')
                    console.log(error);
                resolve({
                    error
                });
            } else resolve(rows);
        }));
    }
};