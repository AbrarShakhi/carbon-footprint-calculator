import { NumericQuestion, CategoricalQuestion } from "./question";

const forum = [
  new CategoricalQuestion(1, "Enter your gender", {
    Female: 20, // Carbon emmission value 20
    Male: 10,
    Other: 10,
  }),

  new NumericQuestion(2, "Enter your age", (answer) => {
    if (answer < 18) return 10;
    if (answer <= 30) return 30;
    return 2;
  }),

  new CategoricalQuestion(3, "What is your experience level?", {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
  }),
];

export default forum;
