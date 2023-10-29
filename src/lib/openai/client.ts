import { Configuration, OpenAIApi } from 'openai-edge';
import { OPENAI_API_KEY } from '$env/static/private';

if (!OPENAI_API_KEY) {
	throw new Error('Missing Open AI API key');
}

const openaiConfig = new Configuration({
	apiKey: OPENAI_API_KEY || ''
});

export const openai = new OpenAIApi(openaiConfig);
