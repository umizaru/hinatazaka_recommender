import { generateKey } from "crypto";
import membersData from "./memberdata.json" assert { type: "json" };
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
      maxPoint = memberPoints[member];
      recommendedMembers = member;
    } else if (memberPoints[member] === maxPoint) {
      recommendedMembers.push(member);
    }
  }

  // if (recommendedMembers.length > 2) {
  //   let selectedMember =
  //     recommendedMembers[Math.floor(Math.random() * recommendedMembers.length)];
  //   console.log(selectedMember);
  // }

  let selectedMember = membersData.find(
    (element) => element.name === recommendedMembers
  );
  console.log("メンバー名:", selectedMember.name);
  console.log("キャッチフレーズ:", selectedMember.catchphrase);
  console.log("ブログURL:", selectedMember.url);
}
hinatazakaRecommender();
