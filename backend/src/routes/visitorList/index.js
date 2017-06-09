'use strict';

var express = require('express');
var controller = require('./visitorList.controller');
var messenger = require('./messenger');

var router = express.Router();

router.post("/",                           controller.createReq);
router.get("/company/:id",                 controller.getCompanyVisitorListReq);
router.delete("/company/:company_id/visitor/:visitor_id", controller.deleteVisitorReq);
router.delete("/:id",                      controller.deleteReq);
// router.post("/messenger", messenger.post);
// router.get("/messenger", messenger.get);

module.exports = router;