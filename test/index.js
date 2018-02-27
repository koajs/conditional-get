'use strict'

import test from 'ava'
import Koa from 'koa'
import calculate from 'etag'
import etag from 'koa-etag'
import conditional from '../.'
import server from './helpers/server'

const body = {
  name: 'tobi',
  species: 'ferret',
  age: 2
}

test('when cache is fresh should respond with 304', async t => {
  const koa = new Koa()
  koa
    .use(conditional())
    .use(etag())
    .use(async (ctx, next) => {
      await next()
      ctx.body = body
    })

  const app = server(koa)
  const res = await app
    .get('/')
    .set('If-None-Match', calculate(JSON.stringify(body)))

  t.is(res.status, 304)
})

test('when cache is stale should do nothing', async t => {
  const koa = new Koa()
  koa
    .use(conditional())
    .use(etag())
    .use(async (ctx, next) => {
      await next()
      ctx.body = body
    })

  const app = server(koa)
  const res = await app
    .get('/')
    .set('If-None-Match', 'tobi')

  t.is(res.status, 200)
})
