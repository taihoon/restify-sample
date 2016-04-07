"use strict";
const erm = require("express-restify-mongoose");
const mongoose = require("mongoose");
const restify = require("restify");
const memoModel = require("./models/memo.model");

mongoose.connect("mongodb://localhost/memo");

const server = restify.createServer();
server.use(restify.bodyParser());

erm.defaults({restify: true});
erm.serve(server, memoModel, {name: "memos"});

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});