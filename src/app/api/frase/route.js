import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import axios from "axios";

const openaiInternal = createOpenAI({
  baseURL: "http://localhost:1337/v1/chat/completions",
  apiKey: process.env.OPENAI_API_KEY,
  model: "mistral-ins-7b-q4",
  stream: true,
  max_tokens: 2048,
  compatibility: "strict",
  frequency_penalty: 0,
  presence_penalty: 0,
  temperature: 0.7,
  top_p: 0.95,
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "Write a haiku about recursion in programming.",
    },
  ],
});

export async function POST(request) {
  const { messages } = await request.json();
  console.log(messages);
  const result = streamText({
    baseURL: "http://localhost:1337/v1/chat/completions",
    apiKey: process.env.OPENAI_API_KEY,
    model: "mistral-ins-7b-q4",
    messages: convertToCoreMessages(messages),
  });
  return result.finally();
}

//POST CON AXIOS RESPONDE
// export async function POST(request) {
//   const { messages } = await request.json();

//   let data = JSON.stringify({
//     messages: [
//       {
//         content: "You are a helpful assistant.",
//         role: "system",
//       },
//       messages[0],
//     ],
//     model: "mistral-ins-7b-q4",
//     stream: true,
//     max_tokens: 2048,
//     stop: ["hello"],
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     temperature: 0.7,
//     top_p: 0.95,
//   });

//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "http://127.0.0.1:1337/v1/chat/completions",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };

//   const response = axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   const stream = OpenAIStream(response);
//   console.log(stream);

//   return new StreamingTextResponse(stream);
// }


//FUNCIONA
//cuidado con la ruta
// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { Configuration, OpenAIApi } from "openai-edge";

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
//   basePath: "http://127.0.0.1:1337/v1/chat",
// });
// const openai = new OpenAIApi(config);
// export const runtime = "edge";

// export async function POST(req) {
//   const { messages } = await req.json();
//   const response = await openai.createCompletion({
//     model: "mistral-ins-7b-q4",
//     stream: true,
//     messages,
//     stop: ['hello'],
//   });

//   const stream = await OpenAIStream(response);
//   return new StreamingTextResponse(stream);
// }