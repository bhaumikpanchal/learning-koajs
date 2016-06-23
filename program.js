var koa = require('koa');
var session = require('koa-session');

var app = koa();

app.keys = ['secret', 'keys'];

app.use(session(app));

app.use(function* (next) {
  if (this.path === '/') {
    yield next;
  }

  var cnt = ~~this.session.view + 1;

  this.session.view = cnt;
  this.body = cnt + ' views';

});

app.listen(process.argv[2]);