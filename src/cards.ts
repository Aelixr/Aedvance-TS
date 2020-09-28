import { UnitCard } from "./interfaces";

export const describeUnitCard = (properties: Pick<UnitCard, "name"|"stats">) => {

};

const Banana = describeUnitCard({
  name: "banana",
  stats: {
    attackDelay: 1,
    power: 10,
    health: 10,
    moveDelay: 1,
  }
});

