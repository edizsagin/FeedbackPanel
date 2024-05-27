/*global QUnit*/

sap.ui.define([
	"zkt_bldg/controller/GeriBildirim1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("GeriBildirim1 Controller");

	QUnit.test("I should test the GeriBildirim1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
