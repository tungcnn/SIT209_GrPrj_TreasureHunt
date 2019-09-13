const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb+srv://tungnguyen:21011998@sit209-gzop8.mongodb.net/test'); /*process.env.MONGO_URL, { useNewUrlParser: true }**/
const User = require('./models/user');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.use(express.static(`${__dirname}/public`));


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.post('/api/authenticate', (req, res) => {
     const { user, password } = req.body;
     User.find({username:user}, (err, result) => {
     if (err) {
     return res.send(err);
     } else {
     if (result.length <1) {
     return res.send('No user found');
     } else {
     if (password !== password) {
     return res.send('Password does not match');
     } else {
     return res.json({
     success: true,
     message: 'Authenticated successfully',
 // isAdmin: found.isAdmin
     });
     }
     }
     }
     })
     });
    

// app.post('/api/authenticate', (req, res) => {
//     const { user, password } = req.body;
//     User.find({username:user, password: password}, (err, result) => {
//         if (err) {
//             return res.send(err);
//         } else {
//             if (result.length <1) {
//                 return res.send('Wrong user name or password');
//             } else {
//                 try {
//                     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
//                     return res.json({
//                         // success: true,
//                         token: token
//                     });
//                 } catch (err) {
//                     console.log('Error');
//                     return res.send(err);
//                 }
//             }
//         }
//     })
// });

app.post('/api/registration', (req, res) => {
    const { user, password, isAdmin } = req.body;
    User.find({ username: user }, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (result.length > 0) {
                return res.send('User already existed');
            }
            else {
                const newUser = new User({
                    username: user,
                    password,
                    isAdmin
                });
                newUser.save(err => {
                    return err
                        ? res.send(err)
                        : res.json({
                            success: true,
                            message: 'Created new user'
                        });
                });
            }
        }
    })
});

// --------- Authorization Middleware ---------
// app.use(function (req, res, next){
//     const token = req.headers.authorization.split('')[1];
//     if (!token) return res.status(401).send('Access Denied');

//     try{
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid Token');
//     }
// });

app.get('/api/testjwt', (req, res) => {
    res.send('The JWT is working!');
});