import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "http://127.0.0.1:1337/v1",
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req) {
  const brainPrepare = `you are an assistant that only answers in spanish,
  I'm giving you an author, an initial id that is autoincremental and how many phrases of the author to search,
  I need you to search phrases and 5 hashtags that fits to each phrase, add the symbol # to the begining of each hashtag,
  format it as a json file,with the following format, {id, frase, autor, hashtags}. response must be only a json file, don't verbose`;
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "mistral-ins-7b-q4",
    stream: true,
    messages: [...messages, { role: "system", content: brainPrepare }],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

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
