var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    return `
    <!doctype html>
    <html lang="ko">
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
    </body>
    </html>
        `;
}

function templateLIST(filelist) {
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length) {
        list = list + `<li><a href="/?page=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i+1;
    }
    list = list+'</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var QueryData = url.parse(request.url, true).query;
    var uri = url.parse(request.url, true).pathname;

    if (uri === '/') {
        if (QueryData.page === undefined) {
            fs.readdir('./data', function(err, filelist) {
            var title = 'welcome';
            var description = 'hello';
            var list = templateLIST(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function(err, filelist) {
                fs.readFile(`data/${QueryData.page}`, 'utf8', function(err, description) {
                var list = templateLIST(filelist);
                var title = QueryData.page;
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);