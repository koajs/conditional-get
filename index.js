
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
  return function(next){
    return function *(){
      yield next;
      if (this.stale) return;
      this.status = 304;
      this.body = null;
    }
  }
}