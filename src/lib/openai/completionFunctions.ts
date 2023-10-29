import type { ChatCompletionFunctions } from 'openai-edge';
import { compile, type HtmlToTextOptions } from 'html-to-text';

const htmlToTextConfig: HtmlToTextOptions = {
	wordwrap: 120,
	selectors: [
		{
			selector: 'img',
			format: 'skip'
		},
		{
			selector: 'footer',
			format: 'skip'
		},
		{
			selector: 'nav',
			format: 'skip'
		},
		{
			selector: 'div#dropdown',
			format: 'skip'
		}
	]
};

const htmlToText = compile(htmlToTextConfig);

export const completionFunctions: ChatCompletionFunctions[] = [
	{
		name: 'get_recipe',
		description: 'Get the recipe from the provided URL.',
		parameters: {
			type: 'object',
			properties: {
				url: {
					type: 'string',
					description: 'The recipe page URL.'
				}
			},
			required: ['url']
		}
	}
];

export type GetPageContentArgs = { url: string };

export async function getPageContent({ url }: GetPageContentArgs) {
	try {
		const response = await fetch(url);
		const text = await response.text();
		return htmlToText(text);
	} catch (error) {
		console.error('fetch error', error);
		return {
			message: 'Unable to load the provided URL'
		};
	}
}

export async function runFunction(name: string, args: unknown) {
	switch (name) {
		case 'get_recipe':
			return await getPageContent(args as GetPageContentArgs);
		default:
			return null;
	}
}
