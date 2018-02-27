'use strict'

import request from 'supertest'
import toPort from 'hash-to-port'

function server(koa) {
  const hash = (Number(String(Math.random()).split('.')[1]) + Date.now()).toString(26)
  return request.agent(koa.listen(toPort(hash)))
}

export default server
