/*
 *[WARNING] DON'T MOVE THIS FILE. THIS FILE NEEDS TO BE AT THE ROOT OF THE PROJECT. CODE IS PATH DEPENDANT
 */

var ElectronPDF = require("electron-pdf");
var config = require("./config/pdf.config.json");
var mkdirp = require("mkdirp");
var pathExists = require("path-exists");
var path = require("path");
var forEach = require("foreach");

//helper
var isValid = function(str){
  return (typeof str === "string" && str.length > 0) ? true : false;
}
var handleError = function(err){
  console.error(err.stack);
  process.exit(1);
}
//globals
var queueCounter = 0;
var jobCounter = 1;
var renderCounter = 1;
var jobQueue = {jobs:[]};

//main
var exporter = new ElectronPDF()
exporter.start();
exporter.on("charged",run)

//step functions
function run(){

  console.log("[SETUP] TOTAL SOURCES: " + config.sources.length);
  console.log("[SETUP] TOTAL PDFS TO RENDER: " + config.sources.length*2);

  setup(config.sources,function(){
  	assignJob();
  });

}

function assignJob(){
	console.log("assign job here");
	var job = jobQueue.jobs[queueCounter++];
	try{
		if(typeof job !== "undefined" && job){
			createJob(job.pageSize,job.sizeName,job.source);
		} else {
			throw new Error("job is undefined");
		}
	}
	catch(err){
		process.exit(1);
	}
} 

function setup(sources,cb){
	sources.forEach(function(source){
	  //Error Checking
	  for(key in source){
	  	var val = source[key];
	  	if(!isValid(val)){
	  		throw new Error(val + " is not a valid path or name")
	  	}
	  }

	  //create job for different pageSizes
	  var pageSizes = {
	    "a4": { // A4
	    	height:424285,
	    	width:300000
	    },
	    "letter": { //Letter
	    	height:388235,
	    	width:300000
	    }
	  }
	  forEach(pageSizes,function(pageSize,sizeName){
	    //initialization
	    //check if directory exists, if not create it and run job
	    var targetDir = path.join(__dirname,source.targetDir);
	    pathExists(targetDir).then(function(exists){
	    	if(!exists){
	    		mkdirp.sync(targetDir)
	    		console.log("[SETUP] Creating Directory: " + targetDir);
	    	}
	    	jobQueue.jobs.push({pageSize:pageSize,sizeName:sizeName,source:source});
	    	if(jobQueue.jobs.length >= sources.length*2){
	    		console.log("[SETUP] SETUP IS FINISHED. READY TO CREATE JOB")
	    		cb();
	    	}
	    }).catch(handleError);
	  });
	});
}

function createJob(pageSize,sizeName,source){
	console.log("[CREATE] CREATING JOB " + jobCounter);
	var target = path.join(__dirname,source.targetDir,source.name + "_" + sizeName + "." + source.fileType)
	var options = {
		pageSize: pageSize,
		printBackground: true,
		disableCache: true,
		waitForJSEvent: true,
		marginsType: 1 
	}
	var jobOptions = {
		inMemory: false
	}
	exporter.createJob(source.path,target,options,jobOptions).then(render).catch(handleError);
}

function render(job){
	console.log("         input: " + job.input[0]);
	console.log("         output: " + job.output);
	console.log("[RENDER] RENDERING JOB " + jobCounter);
	jobCounter++;
	job.on("job-complete",function(r){
		console.log("[FINISH] JOB " + renderCounter + " DONE. " + r.results);
		if(r.error){
			console.error(r.error);
		}
		renderCounter++;
		if(renderCounter-1 === config.sources.length*2){
			console.log("[FINISH] FINISHED RENDERING ALL PDFS! HOORAY!");
			process.exit();
		} else {
			assignJob();
		}
	})
	job.render();
}

