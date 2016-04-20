"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("memos", () => {
	let memo;
	describe("post", () => {
		it("should created", done => {
			chai
				.request("localhost:8080")
				.post("/api/v1/memos")
				.send({user: "brown", contents: "test memo"})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(201);
					memo = res.body;
					done();
				});
		});
	});
	describe("GET", () => {
		it("should fetched", done => {
			chai
				.request("localhost:8080")
				.get(`/api/v1/memos/${memo._id}`)
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});
		it("should fetched all", done => {
			chai
				.request("localhost:8080")
				.get("/api/v1/memos")
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array");
					done();
				});
		});
	});
	describe("PATCH", () => {
		it("should updated", done => {
			chai
				.request("localhost:8080")
				.patch(`/api/v1/memos/${memo._id}`)
				.send({user: "choco", contents: "updated memo"})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});
	});
	describe("DELETE", () => {
		it("should deleted", done => {
			chai
				.request("localhost:8080")
				.delete(`/api/v1/memos/${memo._id}`)
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(204);
					done();
				});
		});
	});
});