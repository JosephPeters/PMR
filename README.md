# Data Extraction AI Chat Example

This project is an example of a data extraction AI chat application designed to gather specific details about an auto accident. The application uses tool function calling to extract relevant information, which can then be sent or used in various ways. While this example utilizes Vercel's AI SDK, the same functionality can be achieved with any framework and Tool Calling LLM.

## Overview

The application consists of a chat interface where users can describe an auto accident they recently experienced. The AI assistant will ask follow-up questions to gather specific details such as the date, time, location, number of cars involved, and a description of any injuries. Once all the necessary information is collected, the data is processed and displayed to the user.

## Key Files

### `src/app/api/data-collection/route.ts`

This file defines the API route for handling data collection requests. It uses the OpenAI model to interact with the user and gather accident details. The `streamText` function is used to process the conversation, and the `tool` function is called to extract the required information.

Key points:
- The AI assistant asks the user to describe the accident and follows up with specific questions if needed.
- The `accident_details` tool is defined to gather information such as date, time, location, number of cars, and description of injuries.
- The extracted data is returned as a response.

### `src/app/components/chatview.tsx`

This file defines the chat interface component. It uses the `useChat` hook from the AI SDK to manage the chat state and handle user input.

Key points:
- The chat interface displays messages from both the user and the AI assistant.
- The `handleSubmit` function is used to send user input to the API.
- The extracted accident details are displayed in a formatted manner once they are available.

## How It Works

1. The user initiates a conversation by describing an auto accident.
2. The AI assistant processes the input and asks follow-up questions to gather specific details.
3. The `accident_details` tool is called to extract the required information.
4. The extracted data is displayed to the user in the chat interface.

## Dependencies

- `@ai-sdk/openai`
- `ai`
- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Run the development server using `npm run dev`.
4. Open the application in your browser and start a conversation with the AI assistant.

## Conclusion

This example demonstrates how to create a data extraction AI chat application for gathering specific details about an auto accident. By using tool function calling, the extracted data can be processed and utilized in various ways. The implementation can be adapted to other use cases and frameworks as needed.
