import pkg from "enquirer";
const { prompt } = pkg;

async function hinatazakaRecommender() {
  const answer1 = await prompt({
    type: "select",
    name: "generation",
    message: "何期生が好きですか？",
    choices: ["1期生", "2期生", "3期生"],
  });

  const answer2 = await prompt({
    type: "select",
    name: "from",
    message: "出身地はどこですか？",
    choices: ["関東", "関西", "地方"],
  });

  const answer3 = await prompt({
    type: "select",
    name: "height",
    message: "身長はどうですか？",
    choices: ["高", "中", "低"],
  });

  const answer4 = await prompt({
    type: "select",
    name: "character",
    message: "キャラはどうですか？",
    choices: ["おバカ", "賢い", "クール", "天然", "ピュア"],
  });

  const answer5 = await prompt({
    type: "select",
    name: "looks",
    message: "見た目はどうですか？",
    choices: ["かわいい", "きれい"],
  });
}

hinatazakaRecommender();
