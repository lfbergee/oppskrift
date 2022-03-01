import { ImageRequireSource } from "react-native";
import porchettaImg from "./porchetta.png";
import pinnekjttImg from "./pinnekjtt.png";

export interface FormattedRecipe {
  title: string;
  img: ImageRequireSource;
  steps: {
    timeOffset: number;
    title: string;
    description: string;
  }[];
}

const porchetta = {
  title: "Porchetta",
  img: porchettaImg,
  steps: [
    {
      timeOffset: 7,
      title: "Gjør klar ribba",
      description: "Ta ut av kjøleskapet",
    },
    {
      timeOffset: 6.5,
      title: "Skru på ovnen",
      description: "90 grader",
    },
    {
      timeOffset: 3.5,
      title: "Opp med varmen",
      description: "170 grader",
    },
    {
      timeOffset: 1,
      title: "Siste finish",
      description: "225 grader",
    },
    {
      timeOffset: 0,
      title: "Server",
      description: "Kutt opp",
    },
  ],
};

const pinnekjtt = {
  title: "Pinnekjøtt",
  img: pinnekjttImg,
  steps: [
    {
      timeOffset: 36,
      title: "Legg i vann",
      description: "Vann ut kjøttet",
    },
    {
      timeOffset: 24,
      title: "Bytt vann",
      description: "Skyll kjøttet",
    },
    {
      timeOffset: 6,
      title: "Start damping",
      description: "Fyll opp vann til over pinnene, start koking",
    },
    {
      timeOffset: 4,
      title: "Fyll på vann",
      description: "Pass på at det ikke koker tørt",
    },
    {
      timeOffset: 1.5,
      title: "Kok kålrabi",
      description: "På med vann og kok i vei",
    },
    {
      timeOffset: 0.5,
      title: "Kok poteter",
      description: "På med vann og kok i vei",
    },
    {
      timeOffset: 0.3,
      title: "Mos kålrabi",
      description: "Mos til fin konsistens hell i fløte og masse masse smør",
    },
    {
      timeOffset: 0,
      title: "Server",
      description: "Kos deg",
    },
  ],
};

export const recipes = [
    porchetta,
    pinnekjtt
]

export const fetchRecipe = (recipe: string): FormattedRecipe | undefined => {
  switch (recipe) {
    case "porchetta":
      return porchetta;
    case "pinnekjøtt":
      return pinnekjtt;
    default:
      break;
  }
};
