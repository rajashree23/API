const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');

// router.get('/', (req, res, next) => {

//     res.status(200).json({
//         message: 'handling get request'
//     });

// });



router.post('/signup', userController.user_signup);



router.post('/login', userController.user_login);




// router.get('/:username/:password', (req, res, next) => {

//     const username = req.params.username;
//     const password = req.params.password;
//     console.log(username);

//     usermodel.find({ 'username': username }, function (err, user) {
//         if (err) throw err;
//         if (user) {
//             if (err) throw err;
//             if (user[0].password == password) {
//                 res.status(200).json({
//                     message: 'valid password'
//                 });
//             }
//             else {
//                 res.status(404).json({
//                     message: 'invalid password'
//                 });
//             }
//         }
//     });
// });



module.exports = router;