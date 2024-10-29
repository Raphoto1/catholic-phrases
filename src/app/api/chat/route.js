import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
//cuidado con la ruta!!!!
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "http://127.0.0.1:1337/v1/chat",
});
const openai = new OpenAIApi(config);
export const runtime = "edge";

export async function POST(req) {
  const { messages } = await req.json();

  
  const response = await openai.createCompletion({
    model: "mistral-ins-7b-q4",
    system:'you are an assistant that only answers in spanish and will finish avery response with this phrarse "sii te estoy entendiendo rey"',
    stream: true,
    messages,
    stop: ["hello"],
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.7,
    top_p: 0.95,
  });

  const stream = await OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
