var http = require('http');
var jsdom = require("jsdom").jsdom;
var fs = require("fs");

function getCollectionData(callback) {

    return http.get({
        host: 'vision.cs.uiuc.edu',
        path: '/pascal-sentences/'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = body.toString();
            callback(
                parsed
            );
        });
    });

}

function processData(data) {
    var el = jsdom(data);
    var imageTags = el.getElementsByTagName('img');
    var dataset = el.querySelectorAll("body > table > tbody > tr");
    var sources = [];
    var captions = [];
    for (var i = 0; i < dataset.length; i++) {
        sources.push(dataset[i].getElementsByTagName("img")[0].src);
        var imgCaptions = [];
        dataset[i].querySelectorAll("td table tbody tr td").forEach(function (caption) {
            imgCaptions.push(caption.innerHTML.toLowerCase());
        });
        captions.push(imgCaptions);
    }
    var captionsObject = [];
    var urls = [];
    for (var j = 0; j < dataset.length; j++) {
        var fullImgURL = "http://vision.cs.uiuc.edu/pascal-sentences/" + sources[j];
        var splittedSource = sources[j].split("/");
        var localPath = "pascal/" + splittedSource[splittedSource.length - 1];
        captionsObject.push({file_path: localPath, captions: captions[j]});
        urls.push({file_path: localPath, url: fullImgURL});
    }
    fs.writeFileSync("./urls.json", JSON.stringify(urls, null, 2));
    fs.writeFileSync("./captions.json", JSON.stringify(captionsObject, null, 2));
}

getCollectionData(processData);
