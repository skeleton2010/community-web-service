var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template');
var path = require('path');
var sanitizehtml = require('sanitize-html');

var app = http.createServer(function(request,response) {
    var QueryData = url.parse(request.url, true).query;
    var uri = url.parse(request.url, true).pathname;

    if (uri === '/') {
        if (QueryData.page === undefined) {
            fs.readdir('./data', function(err, filelist) {
            var title = 'welcome';
            var description = 'hello';
            var list = template.LIST(filelist);
            var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
        } else {
            fs.readdir('./data', function(err, filelist) {
                var filteredhack = path.parse(QueryData.page).base;
                fs.readFile(`data/${filteredhack}`, 'utf8', function(err, description) {
                var title = QueryData.page;
                var sanitizedTitle = sanitizehtml(title);
                var sanitizedDescription = sanitizehtml(description);
                var list = template.LIST(filelist);
                var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`, 
                `<a href="/create">create</a>
                 <a href="/update?page=${sanitizedTitle}">update</a> 
                 <form action="delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                 </form>
                 `);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (uri === '/create') {
        if (QueryData.page === undefined) {
            fs.readdir('./data', function(err, filelist) {
            var title = 'new page';
            var list = template.LIST(filelist);
            var html = template.HTML(title, list, `
                <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"class="title"></p>
                <p>
                    <textarea name="description" placeholder="description" class="desc"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(html);
            });
        }
    } else if (uri === '/create_process') {
        var body = '';
        request.on('data', function(data) {
            body = body+data; 
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description
            fs.writeFile(`data/${title}`, description, (err) => {
                if (err) throw err;
                else {
                    response.writeHead(302, {Location: `/?page=${title}`});
                    response.end();
                };
            });
        });
    } else if (uri === '/update') {
        fs.readdir('./data', function(err, filelist) {
            var filteredhack = path.parse(QueryData.page).base;
            fs.readFile(`data/${filteredhack}`, 'utf8', function(err, description) {
            var list = template.LIST(filelist);
            var title = QueryData.page;
            var html = template.HTML(title, list, 
            `
            <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title"class="title" value="${title}"></p>
                <p>
                    <textarea name="description" placeholder="description" class="desc">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `, `<a href="/create">create</a> <a href="/update?page=${title}">update</a>`);
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (uri === '/update_process') {
        var body = '';
        request.on('data', function(data) {
            body = body+data; 
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(err) {
                if (err) {
                    console.log('ERROR:' + err);
                    throw err;
                }
                fs.writeFile(`data/${title}`, description, (err) => {
                    if (err) throw err;
                    else {
                        response.writeHead(302, {Location: `/?page=${title}`});
                        response.end();
                    };
                });
            });
        });
    } else if (uri === '/delete_process') {
        var body = '';
        request.on('data', function(data) {
            body = body+data; 
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var filteredhack = path.parse(id).base;
            fs.unlink(`data/${filteredhack}`, function(err){
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
     } else {
        response.writeHead(404);
        response.end(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <p>Not found</p>
        </body>
        </html>
        `);
    }
});
app.listen(3000);