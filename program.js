var koa = require('koa');

var app = koa();

app.keys = ['secret', 'keys'];

app.use(function* (next) {
  if (this.path === '/') {
    yield next;
  }

  var cnt = ~~this.cookies.get('view', {signed: true}) + 1;

  this.cookies.set('view', cnt, {signed: true});
  this.body = cnt + ' views';

});

app.listen(process.argv[2]);