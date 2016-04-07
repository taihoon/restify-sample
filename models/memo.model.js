"use strict";
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user: String,
	contents: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Memo", schema);