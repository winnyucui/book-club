
<script>
	import ShelfSlot from './ShelfSlot.svelte';

	export let name;



	export let book = {
		title: "Harry Potter and the Sorcerer's Stone",
		author: "J.K. Rowling",
		image: "https://via.placeholder.com/200x300",
		text_box: "Cina says: blah blah blah blah",
	}
	export let nominated_books = [book, book, book, book]
	
	// export default {
	// 	components: { Box, Counter }
	// };
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	
	{#each nominated_books as book}
		<ShelfSlot {...book}/>
	{/each}
	

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>