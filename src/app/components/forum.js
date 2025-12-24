import {
  NumericQuestion,
  CategoricalQuestion,
} from "@/app/components/question";

// -------- CONSTANTS --------
const WEEKS_PER_YEAR = 52;
const DAYS_PER_YEAR = 365;

// -------- EMISSION FACTORS --------
const EF = {
  transport: {
    walking: 0.0,   // kg CO2e / km
    rickshaw: 0.0,
    cng: 0.06,
    bus: 0.089,
    shuttle: 0.05,
    car: 0.192,
  },

  food: {
    beef: 27.0,     // kg CO2e / kg
    chicken: 6.9,
    fish: 5.1,
    eggs: 4.8,
    dairy: 2.8,
  },

  electricity_kwh: 0.63, // Bangladesh grid (kg CO2e / kWh)

  digital_hour: 0.035,  // kg CO2e / hour
};

// -------- SERVING SIZE ASSUMPTIONS (kg per serving) --------
const SERVING_KG = {
  beef: 0.2,
  chicken: 0.15,
  fish: 0.15,
  eggs: 0.1,
  dairy: 0.3,
};


class ForumBuilder {
  constructor() {
    this.forum = [];
  }

  build() {
    return this.forum;
  }

  addCatQ(question, options) {
    this.forum.push(
      new CategoricalQuestion(this.forum.length, question, options)
    );
    return this;
  }

  addNumQ(question, scoreFunc) {
    this.forum.push(
      new NumericQuestion(this.forum.length, question, scoreFunc)
    );
    return this;
  }
}

const forum = new ForumBuilder()

  // -------- TRANSPORT --------
  .addNumQ("Average one-way distance to campus (km)", (km) => km)
  .addNumQ("Commute days per week", (days) => days)
  .addCatQ("Primary transport mode", {
    walking: EF.transport.walking,
    rickshaw: EF.transport.rickshaw,
    cng: EF.transport.cng,
    bus: EF.transport.bus,
    shuttle: EF.transport.shuttle,
    car: EF.transport.car,
  })

  // -------- FOOD --------
  .addNumQ("Beef/mutton meals per week", (num) =>
    num * SERVING_KG.beef * EF.food.beef * WEEKS_PER_YEAR
  )
  .addNumQ("Chicken meals per week", (num) =>
    num * SERVING_KG.chicken * EF.food.chicken * WEEKS_PER_YEAR
  )
  .addNumQ("Fish meals per week", (num) =>
    num * SERVING_KG.fish * EF.food.fish * WEEKS_PER_YEAR
  )
  .addNumQ("Egg portions per week", (num) =>
    num * SERVING_KG.eggs * EF.food.eggs * WEEKS_PER_YEAR
  )
  .addNumQ("Dairy portions per week", (num) =>
    num * SERVING_KG.dairy * EF.food.dairy * WEEKS_PER_YEAR
  )

  // -------- ENERGY --------
  .addNumQ("Monthly household electricity bill (BDT)", (bdt) => bdt)
  .addNumQ("Number of people sharing this bill", (num) => num)
  .addNumQ("Approximate tariff (BDT per kWh)", (tariff) => tariff)

  // -------- DIGITAL --------
  .addNumQ("Smartphone usage (hours/day)", (hrs) =>
    hrs * DAYS_PER_YEAR * EF.digital_hour
  )
  .addNumQ("Computer/laptop usage (hours/day)", (hrs) =>
    hrs * DAYS_PER_YEAR * EF.digital_hour
  )

  .build();

export default forum;
