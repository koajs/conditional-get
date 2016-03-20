
var request = require('supertest');
var calculate = require('etag');
var conditional = require('..');
var etag = require('koa-etag');
var Koa = require('koa');
var fs = require('fs');

var body = {
  name: 'tobi',
  species: 'ferret',
  age: 2
};

describe('conditional()', function(){
  describe('when cache is fresh', function(){
    it('should respond with 304', function(done){
      var app = new Koa();

      app.use(conditional());
      app.use(etag());

      app.use(function(ctx, next){
        return next().then(function() {
          ctx.body = body;
        });
      });

      request(app.listen())
      .get('/')
      .set('If-None-Match', calculate(JSON.stringify(body)))
      .expect(304, done);
    })
  })

  describe('when cache is stale', function(){
    it('should do nothing', function(done){
      var app = new Koa();

      app.use(conditional());
      app.use(etag());

      app.use(function(ctx, next){
        return next().then(function() {
          ctx.body = body;
        });
      });

      request(app.listen())
      .get('/')
      .set('If-None-Match', 'tobi')
      .expect(200, done);
    })
  })
})
