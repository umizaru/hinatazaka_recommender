import pkg from "enquirer";
const { prompt } = pkg;
// import fs from "fs";

console.log("日向坂レコメンダーへようこそ!!");
console.log("5問の質問に答えて自分にぴったりの日向坂メンバーを見つけよう!!");

async function askQuestion1() {
  const answer = await prompt({
    type: "select",
    name: "generation",
    message: "何期生がいい？",
    choices: ["1期生", "2期生", "3期生"],
  });
  return answer.generation;
}
const answer1 = askQuestion1();
console.log(answer1);
