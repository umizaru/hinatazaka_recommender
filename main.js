// import data from "./memberdata.json";
import pkg from "enquirer";
const { prompt } = pkg;
import fs from "fs";

console.log("日向坂レコメンダーへようこそ!!");
console.log("5つの質問に答えて、自分にぴったりの日向坂メンバーを見つけよう!!");

async function hinatazakaRecommender() {
  const preparation = await prompt({
    type: "select",
    name: "preparation",
    message: "準備はいいですか？",
    choices: ["はい", "いいえ"],
  });

  const answer1 = await prompt({
    type: "select",
    name: "generation",
    message: "何期生が好きですか？",
    choices: ["1期生", "2期生", "3期生"],
  });

  const answer2 = await prompt({
    type: "select",
    name: "from",
    message: "どの出身地がいいですか？",
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
    message: "どんなキャラが好きですか？",
    choices: ["天然", "賢い", "クール", "おバカ", "ピュア"],
  });

  const answer5 = await prompt({
    type: "select",
    name: "looks",
    message: "見た目は？",
    choices: ["かわいい", "きれい"],
  });
}
hinatazakaRecommender();
