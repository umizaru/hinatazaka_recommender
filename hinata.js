import { readFile } from "fs/promises";
import pkg from "enquirer";
const { prompt } = pkg;
const memberData = JSON.parse(await readFile("./memberdata.json"));
const questionData = JSON.parse(await readFile("./questiondata.json"));

async function hinatazakaRecommender() {
  console.log("日向坂レコメンダーへようこそ!!");
  console.log(
    "5つの質問に答えて、自分にぴったりの日向坂メンバーを見つけよう!!\n"
  );

  const preparation = await prompt({
    type: "select",
    name: "preparation",
    message: "準備ができたら[はい]を推してください",
    choices: ["はい"],
  });

  const answers = {};
  for (const { name, message, choices } of questionData) {
    const { [name]: answer } = await prompt({
      type: "select",
      name,
      message,
      choices,
    });
    answers[name] = answer;
  }

  let memberPoints = {};
  memberData.forEach((member) => (memberPoints[member.name] = 0));
  for (const member of memberData) {
    const { generation, birthplace, height, character, looks } = answers;
    if (member.generation === generation) memberPoints[member.name] += 1;
    if (member.birthplace === birthplace) memberPoints[member.name] += 1;
    if (member.height === height) memberPoints[member.name] += 1;
    if (member.character === character) memberPoints[member.name] += 1;
    if (member.looks === looks) memberPoints[member.name] += 1;
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

  const recommendedMember =
    recommendedMembers[Math.floor(Math.random() * recommendedMembers.length)];
  const selectedMember = memberData.find(
    (member) => member.name === recommendedMember
  );

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function result() {
    console.log("あなたにオススメの日向坂メンバーは…\n");
    await delay(1000);
    console.log(`${selectedMember.catchphrase}${selectedMember.name}だ!!\n`);
    await delay(1000);
    console.log("メンバーのブログはこちら↓");
    console.log(selectedMember.url);
  }
  result();
}
hinatazakaRecommender();
