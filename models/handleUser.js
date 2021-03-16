'use strict';

const mon = require("./mongooseWrap");
const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 

const dbServer ='localhost';
const dbName = "library";

exports.getUsers = async function (que, sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve(dbServer, dbName, User, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.postUsers = async function (req) {
    let chk = { id: req.body.id };  // check object for existence
    let user = new User({                     // create object in db-format
        id: req.body.id,
        password: req.body.password,
        cpr: req.body.cpr,
        currentpenalties: req.body.currentpenalties,
        email: req.body.email,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        newsletter: req.body.newsletter        
    });
    let myPlaintextPassword = {password: req.body.password};

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        console.log(hash);
    });
    
    try {
        let cs = await mon.upsert("localhost", "library", User, user, chk);
        return;
    } catch (e) {
        console.log(e);
    }
}