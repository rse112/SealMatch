

const { Configuration, OpenAIApi } = require("openai");

const express = require('express');
const app = express();
var cors = require('cors');

const configuration = new Configuration({
  apiKey: apikey,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json()); // JSON 파싱을 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱을 위한 미들웨어

app.post('/personalitytest', async function (req, res) {
  const userText = req.body.userInput; // 클라이언트로부터 받은 텍스트
  let usersay = req.body.usersay.slice(1);
  let chatsay = req.body.chatsay;
  console.log(usersay);
  let messages = [
    { role: "system", content: "넌 최고의 성격 테스트 전문가야. 너는 사람들이 흥미를 끌만한 질문과 연애관련 키워드를 구축할 수 있어. " },
    { role: "user", content: "너는 외향적입성향vs 내향적성향 또는 체계적인 문제해결 방식vs 직감과 창의적인 문제해결 접근방식 또는 이성적 판단을 우선시 고려하거나 개인적인 가치관과 감정에 기반한 판단을 우선시를 하는가 또는 일정한 일상생활 vs 융통성 있는 일상생활 의 주제에서만 랜덤으로 선택해서 매번 출력마다 새로운 질문지를 재미있게 생성할 수 있어" },
    { role: "assistant", content: "사람들이 흥미를 끌만한 주제로  재밌는 상황을 연출해서 1개의 질문을 간단하게 만들어줘. 구조는 먼저 '상황:~~', 한줄띄우고 (a)(b)(c)(d)(e)의 5개의 선지출력 반드시 이 형식을 맞춰줘,(e)선지는 항상 잘 모르겠습니다로 통일해줘 출력할 때 상황과 선지만 출력하고 그 이외의 답변은 출력하지마. ''기호는 사용하지마 절대로 선지 이외의 답변은 생성하지마,  선지에는 상황에 맞는 재미있는 상황을 연출하면서 한 문장으로 만들어줘.그리고 상황을 2번 이상출력하지마 오직 한 번만 출력해. 인삿말 넣지마 그냥 바로 상황: 으로 시작해 그리고 (e)선지가 끝났으면 아무 말도 하지말고 끝내. 또한 사용자는 답을 오직 (a)(b)처럼 선택밖에 못하기 때문에 너는 사람들에게 질문을 요구하지마" },
  ];

  function processChatSay(chatsay) {
    let processedChatsay = [];
  
    for (let i = 0; i < chatsay.length; i++) {
      let processedString = chatsay[i];
  
      // Replace all '\n' with '' (empty string)
      processedString = processedString.replace(/\n/g, '');
  
      // Replace all '+' with '' (empty string)
      processedString = processedString.replace(/\+/g, '');

  
      processedChatsay.push(processedString);
    }
  
    return processedChatsay;
  }
  
  processedSay = processChatSay(chatsay);
  console.log(processedSay);


  if (processedSay.length >  6) {
    messages = [
      { role: "system", content: "넌 최고의 성격 테스트 전문가야. 너는 주어진 상황과 사람들이 선택한 행동에 대해 성격을 구분할 수 있어. 출력할 때는 반드시 감사합니다로 시작해야돼" },
      { role: "user", content: "성격을 이분법적으로 나눴어 일단 외향적입성향vs 내향적성향 또는 체계적인 문제해결 방식vs 직감과 창의적인 문제해결 접근방식 또는 이성적 판단을 우선시 고려하거나 개인적인 가치관과 감정에 기반한 판단을 우선시를 하는가 또는 일정한 일상생활 vs 융통성 있는 일상생활 으로 나눴어" },
    ];
  
    while (usersay.length !== 0 && chatsay.length !== 0) {
      if (processedSay.length !== 0) {
        messages.push({
          role: "assistant",
          content: processedSay.shift(),
        });
      }
      if (usersay.length !== 0) {
        messages.push({
          role: "user",
          content: usersay.shift(),
        });
      }
    }
  
    // 추가 데이터를 messages 배열에 추가
    const additionalData_1 = [
      {
        role: "assistant",
        content:
          "너가 조합해서 사용자의 성향을 파악한다면 사양자와 어울리는 동물의 직업을 고르기만 해줘 다른건 하지말고.내향 창의 이성 일정: 박학다식 물범-1내향 창의 이성 융통: 개발자 물범-2내향 창의 감성 일정: 아기 물범-3내향 창의 감성 융통: 감독 물범-4내향 체계 이성 일정: 집순이 물범-5내향 체계 이성 융통: 연구원 물범-6외향 체계 감성 일정: 매니저 물범-7외향 체계 감성 융통: 사랑꾼 물범-8외향 창의 이성 일정: 요리사 물범-9외향 창의 이성 융통: 셀럽이 되고 싶은 물범-10외향 창의 감성 일정: 대학생 물범-11외향 창의 감성 융통: 브루노 물범-12외향 체계 이성 일정: CEO 물범-13외향 체계 이성 융통: 셜록물범-14외향 체계 감성 일정: 선생님 물범-15외향 체계 감성 융통: 인싸 물범-16",      },
    ];
  // 추가 데이터를 messages 배열에 추가
  const additionalData_2 = [
    {
      role: "user",
      content:
        "너가 사용자의 성향과 동물을 골랐다면 그 동물이름을 xxx물범이라고 하자. xxx는 방금골랐던 박학다식 물범,개발자물범,아기물범,감독 물범,집순이 물범,연구원 물범,매니져 물범,사랑꾼 물범,요리사 물범,셀럽이 되고싶은 물범,대학생 물범,브루노 물범,CEO 물범,셜록 물범,선생님 물범,인싸 물범중 하나야. 뒤에 나올 구조는 ()안에 내가 너가 넣고 싶은말을 넣으라고 할꺼야. 되도록 말되게 길게 써줘 다음 구조에 따라 출력해줘.  감사합니다! 당신과 가장 어울리는 물범이름은 xxx물범입니다! xxx물범과 당신이 어울리는 이유는 (너가 말하고싶은 대로)입니다. 당신은 (너가 추천하는 사용자의 직업이나 직무)을 하면 잘할 확률이 높으며, 친구관계나 이성관계의 경우 (너가 추천하는 사용자의 인간관계 꿀팁을 알려주면 돼) 처럼하면 좋을 것 같습니다.(이후엔 너가 하고싶은 말 다해) ",
    },
  ];

    messages.push(...additionalData_1);
    messages.push(...additionalData_2);
  }
  

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages
  });

  let personality = completion.data.choices[0].message['content'];

  // 추가 설명 부분 제거
  personality = personality.replace(/ ※ 다음은 템플릿형인 상황을 .* 출력하세요\./, '');

  console.log(personality);
  res.json({ "assistant": personality });
});

app.listen(3000);
