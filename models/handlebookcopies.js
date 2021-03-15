"use strict";
const mon = require("./mongooseWrap");
const Bookcopies = require("./bookcopiesschema");
const dbServer = "localhost";
const dbName = "library";

exports.getBookcopies = async function (que, sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve(dbServer, dbName, Bookcopies, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.postBookcopies = async function (req) {
    let chk = { title: req.body.title };  // check object for existence
    let bookcopies = new Book({                     // create object in db-format
        bookid: req.body.bookid,
        id: req.body.id,     
    });
    
    //if (req.body.localname === "") book.localname = book.name;
    try {
        let cs = await mon.upsert("localhost", "library", Bookcopies, bookcopies, chk); //Ikke fjern book, den smider vores bøger i databasen
        return;
    } catch (e) {
        console.log(e);
    }
}