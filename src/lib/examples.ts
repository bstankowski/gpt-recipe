export interface Example {
	ingredients: string;
	title: string;
	url: string;
}

export const examples: Example[] = [
	{
		title: 'Pizza inspired by Deadpool',
		url: 'https://www.bingingwithbabish.com/recipes/deadpoolpizza',
		ingredients: '00 Italian flour, mozzarella, olives, parmesan, olive oil'
	},
	{
		title: 'Michigan French Toast Sandwich',
		url: 'https://www.gordonramsay.com/gr/recipes/appleberryjamfrenchtoast/',
		ingredients: 'apple cognac, heavy cream, eggs, butter'
	},
	{
		title: 'Jacket Spuds & Homemade Beans',
		url: 'https://www.jamieoliver.com/recipes/vegetable-recipes/jacket-spuds-and-homemade-beans/',
		ingredients: 'red pepper, spring onions, smoked paprika, Cheddar, plum tomatoes'
	},
	{
		title: 'Best Homemade Pancake',
		url: 'https://www.onceuponachef.com/recipes/best-pancake-recipe.html',
		ingredients: 'powder, sugar, salt, milk, eggs, butter'
	}
];
