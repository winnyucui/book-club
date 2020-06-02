'use strict';
const koa = require('koa')
const koaRouter = require('koa-router')

const app = new koa()
const router = new koaRouter()

router.get('koala', '/', (ctx) => {
  ctx.body = "Welcome! To the Koala Book of Everything!"
})

router.get('nominated_books', '/nominated-books', (ctx) => {
  ctx.body = "Lets list all the nominated books!"
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(1234, () => console.log('running on port 1234'))