import seed from './seed'

const key = 'mal-challenge'

if (!get()) {
  set(seed)
}

/**
 * @typedef {Object<string, string>} Details
 */
/**
 * @typedef {Object<string, any>} CardEntry
 * @property {string} started When you started watching the anime
 * @property {string} finished When you finished watching the anime
 * @property {number} position The position on the board
 * @property {string} challenge The requirments to fulfill the challenge
 * @property {string} title The title of the anime
 * @property {Details} [details] Any extra required details
 */

/**
 * @return {Array.<CardEntry[]>}
 */
export function get() {
  return JSON.parse(localStorage.getItem(key))
}

/**
 * 
 * @param {Array.<CardEntry[]>} json
 */
export function set(json) {
  localStorage.setItem(key, JSON.stringify(json))
}