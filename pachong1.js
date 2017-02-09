var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var url = "https://movie.douban.com/celebrity/1018562/photos/";
var i = 0;

function pachong(url){
	request(url,function(err,res){
		if (err)
			return console.error(err);
		var $ = cheerio.load(res.body.toString());
		var list = []
		$(".cover a").each(function(){
			var url = $(this).attr("href");
			var id = i = i + 1;
			var name = id.toString() + ".jpg";
			getimage(url,name);
		});
		var nexturl = $(".next a").attr("href");
			if (i <= 190)
				pachong(nexturl);
	});
};

function getimage(url,name){
	request(url,function(err,res){
		if (err)
			return console.error(err);
		var $ = cheerio.load(res.body.toString());
		var uri = $(".photo-wp img").attr("src");
		download(uri,name);
	})
};

function download (uri,name){
  request.head(uri, function(err, res, body){
    	request(uri).pipe(fs.createWriteStream('./img/' + name)).on("close",function(){
    		console.log("done!" + name);
    });
  });
};

pachong(url);