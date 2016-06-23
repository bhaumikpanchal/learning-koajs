var koa = require('koa');
var views = require('co-views');

var app = koa();

var views = views(__dirname + '/views', {
  ext: 'ejs'
});

var user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

app.use(function* (next) {
  if (this.path !== '/' || this.path !== 'GET') {
    yield next;
  }

  this.body = yield views('user', {
    user: user
  });
});

app.listen(process.argv[2]);