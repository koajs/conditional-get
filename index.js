'use strict';

/**
 * Conditional GET support middleware.
 *
 * @return {Function}
 * @api public
 */

function conditional() {
  return async function(ctx, next) {
    await next();
    if (ctx.fresh) {
      ctx.status = 304;
      ctx.body = null;
    }
  };
}

/**
 * Expose `conditional`.
 */

module.exports = conditional;
