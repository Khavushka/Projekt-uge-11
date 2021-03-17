'use strict';
const mon = require("./mongooseWrap");
const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 
const session = require('express-session');

const dbServer ='localhost';
const dbName = "library";

// const UFILE = __dirname + '/../data/users.json';

exports.getLogin = async function (que, sort) {
	let succes = false;
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let users = await mon.retrieve(dbServer, dbName, User, que, sort); // await er asynkront og venter, til den får info

	for (let user of users) {
		if (req.body.uid === user.id) {
			succes = await bcrypt.compare(req.body.password, user.password);
			if (succes) {
				req.session.authenticated =true;
				req.session.user = users[0].firstName;
				} else {
					req.session = undefined;
				}
				return success;
			}
		}
	
	}catch(e) {
    console.log(e.message);
    }
}
