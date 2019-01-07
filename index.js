const Manager = require('mu-manager');

let manager = new Manager();

/**
 * Handles the regex substitution of strings in an ordered fashion.
 */
class Parser {
  constructor (){
    this.rules = new Map();
  }

  /**
   * Adds RegExp rule to the substitutions system.
   * @param {Rexexp} pattern The RegExp pattern to match the string agasint.
   * @param {Function} action The expression to run if a match is made. 
   * 
   * @return {Parser} 
   */
  addRule(pattern, action) {
    this.rules.set(pattern, action);
    return this;
  }

  /**
   * Run the Parser rules against a string of text.  The rules will run in
   * the order that they are defined.
   * @param {string} string The text string to be parsed.
   * 
   * @return {string} The string returned with all of the parser rules applied
   * to it.
   */
  parse(text) {
    for(const [key, value] of this.rules) {
      let data = new ParserData(text);
      (data) => {
        text = text.replace(key, value);
      }
    }
    return data;
  }
}

class ParserData {
  constructor(text='') {
    this.text = text;
    this.headers = [];
  }
}

/**
 * @module parser
 */

/**
 * Grabs or creates a new Parser object.
 * @param {string} name The unique name for a parser.
 * @param {object=} options The container object for individual parser
 * settings.
 * 
 * @return {Parser} A Parser object.
 */
module.exports = function (name, options={}) {
  if(!manager.has(name)) {
    const parser = new Parser(options);
    manager.register(name, parser);
    return parser;
  } else {
    return manager.get(name);
  }
}