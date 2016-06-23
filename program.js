var koa = require('koa');

var app = koa();

app.use(responseTime());
app.use(upperCase());

app.use(function* () {
  this.body = 'hello koa';
});

function responseTime() {
  return function* (next) {
    var start = new Date;
    yield next;
    var newTime = new Date - start;
    this.set('X-Response-Time', newTime + 'ms' );
  };
}

function upperCase() {
  return function* (next) {
    // do nothing
    yield next;
    this.body = this.body.toUpperCase();
  };
}

app.listen(process.argv[2]);