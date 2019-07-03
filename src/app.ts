const express = require('express');
const app = express();
const fs = require('fs');

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'mydb',
});

app.get('/users', (req, res, next) => {
    con.query('SELECT * FROM USER', (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    });
});

// app.get('/', (req, res, next) => {
//     setTimeout(() => {
//         try {
//             throw new Error('error');
//         } catch (err) {
//             next(err);
//         }
//     }, 100);
// });

// app.get('/', (req, res, next) => {
//     Promise.resolve().then(() => {
//         throw new Error('error');
//     }).catch(next);
// });

// app.get('/', [
//     (req, res, next) => {
//         fs.readFile('./packagee.json', 'utf8', (err, data) => {
//             res.locals.data = data;
//             // next()にエラーを渡し、カスタムエラーハンドラでそれを処理しない場合、そ
//             // れは組み込みのエラーハンドラによって処理されます。
//             // エラーはスタックトレースを使用してクライアントに書き込まれます。
//             // スタックトレースは本番環境には含まれていません。
//             next(err);
//         });
//     },
//     // 👆が正常に処理された場合👇が実行される
//     (req, res, err) => {
//         // res.locals.data = res.locals.data.split(',')[1];
//         res.send(res.locals.data);
//     },
// ]);

// const errorHandler (err, req, res, next) => {
//     if (res.headersSent) {
//         return next(err)
//     }
//     res.status(500);
//     res.send('error');
// };

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ a: 'b' });
});

app.listen(3000);
