class Question {
  constructor(id, text, type) {
    this.id = id;
    this.text = text;
    this.type = type;
  }

  score(answer) {
    return 0;
  }
}

export class CategoricalQuestion extends Question {
  /**
   * 
   * @param {Number} id 
   * @param {String} text 
   * @param {Map<String, Number>} options 
   */
  constructor(id, text, options) {
    super(id, text, "categorical");
    this.options = options;
    this.scoreMap = options;
  }

  score(answer) {
    return this.scoreMap[answer] ?? 0;
  }
}

export class NumericQuestion extends Question {
  /**
   * 
   * @param {Number} id 
   * @param {String} text 
   * @param {Function} scoreFn 
   */
  constructor(id, text, scoreFn) {
    super(id, text, "number");
    this.scoreFn = scoreFn;
  }

  score(answer) {
    return this.scoreFn(answer);
  }
}
