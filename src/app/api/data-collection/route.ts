import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';


export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        system: "You are a helpful assistant gathering information about an auto accident the user recently experienced. Your task is to gather specific details about the accident. You will gather: date, time, location, number of cars involved, a description of any injuries. You will start by asking the user to describe the accident. If the initial description does not contain the required details, you will ask follow up questions one at a timeto gather the missing information. Once you have gathered all the information, you will use the tool. After you use the accident details tool, thank the user for their time. ",
        messages,
        tools: {
            accident_details: tool({
              description: 'Gather information about the accident',
              parameters: z.object({
                date: z.string().describe('The date of the accident'),
                time: z.string().describe('The time of the accident'),
                location: z.string().describe('The location of the accident'),
                number_of_cars: z.number().describe('The number of cars involved in the accident'),
                description_of_injuries: z.string().describe('A description of any injuries'),
              }),
              execute: async ({ date, time, location, number_of_cars, description_of_injuries }) => {
                return {
                    date,
                    time,
                    location,
                    number_of_cars,
                    description_of_injuries,
                };
              },
            }),
          },
    });

    return result.toDataStreamResponse();
}
