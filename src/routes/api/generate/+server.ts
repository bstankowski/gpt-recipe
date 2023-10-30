import { openai } from '$lib/openai/client';
import { completionFunctions, runFunction } from '$lib/openai/completionFunctions';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const config = {
	runtime: 'edge'
};

const gptModel = 'gpt-4';
// const gptModel = 'gpt-3.5-turbo';

export async function POST({ request }) {
	const { messages, systemMessages } = await request.json();

	// TODO: get the page content before talking to GPT?
	const initialResponse = await openai.createChatCompletion({
		model: gptModel,
		messages,
		stream: true,
		functions: completionFunctions
	});

	const stream = OpenAIStream(initialResponse, {
		experimental_onFunctionCall: async ({ name, arguments: args }, createFunctionCallMessages) => {
			const result = await runFunction(name, args);
			const functionMessages = createFunctionCallMessages(result);

			return openai.createChatCompletion({
				model: gptModel,
				stream: true,
				messages: [...messages, ...systemMessages, ...functionMessages]
			});
		}
	});

	return new StreamingTextResponse(stream);
}
