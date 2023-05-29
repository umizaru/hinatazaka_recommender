import { generateKey } from "crypto";
import membersData from "./memberdata.json" assert { type: "json" };
import pkg from "enquirer";
const { prompt } = pkg;

console.log("日向坂レコメンダーへようこそ!!");
console.log("5つの質問に答えて、自分にぴったりの日向坂メンバーを見つけよう!!");

async function hinatazakaRecommender() {
  const preparation = await prompt({
    type: "select",
    name: "preparation",
    message: "準備ができたら[はい]を推してください",
    choices: ["はい"],
  });

  const answer1 = await prompt({
    type: "select",
    name: "generation",
    message: "何期生が好きですか？",
    choices: ["1期生", "2期生", "3期生"],
  });

  const answer2 = await prompt({
    type: "select",
    name: "from_region",
    message: "どの出身地がいいですか？",
    choices: ["関東", "関西", "地方"],
  });

  const answer3 = await prompt({
    type: "select",
    name: "height_group",
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
    choices: ["きれい", "かわいい"],
  });

  let memberPoints = {};

  membersData.forEach(function (member) {
    memberPoints[member.name] = 0;
  });

  const { generation } = answer1;
  const { from_region } = answer2;
  const { height_group } = answer3;
  const { character } = answer4;
  const { looks } = answer5;

  for (const member of membersData) {
    if (member.generation === generation) {
      memberPoints[member.name] += 1;
    }
  }
  for (const member of membersData) {
    if (member.from_region === from_region) {
      memberPoints[member.name] += 1;
    }
  }
  for (const member of membersData) {
    if (member.height_group === height_group) {
      memberPoints[member.name] += 1;
    }
  }
  for (const member of membersData) {
    if (member.character === character) {
      memberPoints[member.name] += 1;
    }
  }
  for (const member of membersData) {
    if (member.looks === looks) {
      memberPoints[member.name] += 1;
    }
  }

  let maxPoint = 0;
  let recommendedMembers = [];

  for (const member in memberPoints) {
    if (memberPoints[member] > maxPoint) {
      recommendedMembers = [];
      recommendedMembers.push(member);
      maxPoint = memberPoints[member];
    } else if (memberPoints[member] === maxPoint) {
      recommendedMembers.push(member);
    }
  }

  const recommendedMembers1 =
    recommendedMembers[Math.floor(Math.random() * recommendedMembers.length)];
  const selectedMember = membersData.find(
    (element) => element.name === recommendedMembers1
  );
  console.log("あなたにぴったりの日向坂メンバーは…");
  console.log(`${selectedMember.catchphrase}${selectedMember.name}だ!!`);
  console.log("ぜひメンバーのブログもチェックしてみてね！");
  console.log(selectedMember.url);
}
hinatazakaRecommender();
