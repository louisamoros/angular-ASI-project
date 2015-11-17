"use strict"

var utils = require("./../utils/utils");
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;
var relativeContentDirectory = __dirname + CONFIG.contentDirectory;

function Content (json) {

	// ************************************************************************
	// PRIVATE VARIABLES AND FUNCTIONS
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE
	// ***********************************************************************
	//var data = "";

	// ************************************************************************
	// PRIVILEGED METHODS
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS
	// ************************************************************************
	//this.getData = function(){ return this.data };
	//this.setData = function(data){ this.data = data };

	// ************************************************************************
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE => constructor
	// ************************************************************************
	this.type = "";
	this.id = "";
	this.src = "";
	this.title = "";
}

module.exports = Content;
