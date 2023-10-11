import { openAI } from "@/openai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requirement = searchParams.get("requirement");
  const response = await openAI.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You will find ambiguities for given user requirements. Give a list of ambiguities, don't include anything else in your messages.",
      },
      { role: "user", content: `Requirement: ${requirement}` },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(response)
  return Response.json({ ambiguities: response.choices[0].message.content });
}
