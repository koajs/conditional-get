/**
 * Expose `conditional`.
 */

module.exports = conditional;

/**
 * Conditional GET support middleware.
 *
 * @return {Function}
 * @api public
 */

function conditional() {
  return function *(next){
    yield* next;
    if (this.fresh) {
      this.status = 304;
      this.body = null;
    }
  }
}
