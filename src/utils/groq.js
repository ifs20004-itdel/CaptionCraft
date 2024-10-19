const GROQ_API_URL = import.meta.env.VITE_GROQ_LLM_API_BASE_URL
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_LLM_CHAT_MODEL = import.meta.env.VITE_GROQ_LLM_CHAT_MODEL

export const chat = async(message, paramList, isEmoji) => {
  const url = `${GROQ_API_URL}`;
  const param = JSON.stringify(paramList)
  const parse = JSON.parse(param)

  const header = {
    "Content-Type": "application/json",
     Authorization: `Bearer ${GROQ_API_KEY}`,
  }
  const model = GROQ_LLM_CHAT_MODEL;
  console.log(param)
  console.log(isEmoji)
  const prompt = `
    You're work as an AI assistant to provide the answer only. 
    Your task is to help user to generate caption for social media feed post based on the following description:
    ${message}
    
    Make the caption ${parse["Length"]}, in a ${parse["Tone"]} tone, and engaging. Use ${isEmoji ? "emojis": "no emojis"} and also use ${parse["Hastags"]}.
  `
  try{
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        model   : model,
        messages: [{
          role: "user",
          content: prompt,
        }],
        stream  : false,
      }),
    })
    const {choices} = await response.json()
    return {choices}
  }catch(error){
    console.error(error);
    return null;
  }
}
