<script lang="ts">
	import { examples, type Example } from '$lib/examples';
	import { useChat } from 'ai/svelte';
	import {
		Alert,
		Button,
		Card,
		Input,
		Label,
		Listgroup,
		ListgroupItem,
		Spinner,
		Textarea
	} from 'flowbite-svelte';
	import type { ChatCompletionRequestMessage } from 'openai-edge';
	import SvelteMarkdown from 'svelte-markdown';

	let ingredients = '';
	let canReload = false;

	let systemMessages: ChatCompletionRequestMessage[];
	$: systemMessages = [
		{
			role: 'system',
			content: 'If you think the provided text is not a recipe – say it, and stop here.'
		},
		{
			role: 'system',
			content: `
			You are given a recipe, and a list of ingredients you have: ${ingredients},

			Your task is to:
			1. Use the dish name as a title.
			2. If you are able to get the information from the recipe, say how much time it takes to prepare the dish.
			3. Create a Markdown table of all ingredients from the recipe with 3 columns: Ingredient, Quantity, Do I have it?. In the last column answer whether you have each ingredient with '✔︎ Yes' or '✘ No'.
			4. Create a list of easy to follow steps to prepare the dish.
			5. Add a note that this recipe is not yours, link to the source and name the author.
			`
		}
	];

	const { error, handleSubmit, input, isLoading, messages, reload, stop } = useChat({
		api: '/api/generate',
		onFinish: () => (canReload = true)
	});

	const handleClickExample = (example: Example) => {
		ingredients = example.ingredients;
		$input = example.url;
	};
</script>

<svelte:head>
	<title>GPT Recipe Analysis</title>
</svelte:head>

<div class="grid lg:grid-cols-2 gap-8">
	<aside>
		<Listgroup active class="w-100">
			<h2 class="px-4 py-2 text-m font-medium text-gray-900 dark:text-white">Examples</h2>
			{#each examples as example}
				<ListgroupItem class="text-base text-sm gap-2" on:click={() => handleClickExample(example)}>
					{example.title}
				</ListgroupItem>
			{/each}
		</Listgroup>
	</aside>

	<main>
		<form
			on:submit={(e) =>
				handleSubmit(e, {
					options: {
						body: { systemMessages }
					}
				})}
		>
			<div class="mb-6">
				<Label for="recipe-url">Recipe page URL<span class="text-red-500">*</span></Label>
				<Input
					bind:value={$input}
					id="recipe-url"
					name="recipe-url"
					placeholder="example.com/recipes/sponge-cake"
					required
					type="url"
				/>
			</div>

			<div class="mb-6">
				<Label for="ingredients" class="mb-2">What ingredients do you have?</Label>
				<Textarea id="ingredients" rows="4" name="ingredients" bind:value={ingredients} />
			</div>

			<div class="flex flex-row items-center gap-3">
				<Button type="submit" color="green" disabled={$isLoading || !$input}>Get the recipe</Button>

				{#if canReload}
					<Button
						color="green"
						outline
						disabled={$isLoading}
						on:click={() =>
							reload({
								options: {
									body: { systemMessages }
								}
							})}
					>
						Reload
					</Button>
				{/if}

				{#if $isLoading}
					<Button type="button" color="red" on:click={stop}>Stop</Button>
					<Spinner size="5" />
				{/if}
			</div>
		</form>

		{#if $error}
			<Alert color="red" class="mt-4">Unable to access the provided URL</Alert>
		{/if}

		{#if $messages.length}
			<ul>
				{#each $messages as message}
					{#if message.role === 'assistant'}
						<li>
							<Card class="response my-4" size="xl">
								<SvelteMarkdown
									source={message.content}
									options={{
										silent: true
									}}
								/>
							</Card>
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</main>
</div>

<style>
	:global(.response *) {
		color: #333;
	}

	:global(.response a) {
		color: #eb4f27;
	}

	:global(.response h1) {
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		font-weight: 600;
	}

	:global(.response h2) {
		margin: 0.75rem 0 0.25rem;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.25;
	}

	:global(.response h3),
	:global(.response p),
	:global(.response ol),
	:global(.response ul),
	:global(.response table) {
		margin-bottom: 0.75rem;
	}

	:global(.response *:last-child),
	:global(.response *:empty) {
		margin-bottom: 0;
	}

	:global(.response ol li) {
		margin-left: 1.5rem;
		list-style: decimal;
	}

	:global(.response ul li) {
		margin-left: 1.5rem;
		list-style: disc;
	}

	:global(.response td),
	:global(.response th) {
		padding: 0.25rem 0.75rem;
		border-collapse: collapse;
		border: 1px solid #ddd;
		text-align: left;
	}
</style>
