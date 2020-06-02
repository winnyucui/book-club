<script context="module">
	export function preload({ params, query }) {
		
		return this.fetch(`nominated-books.json`).then(r => r.json()).then(nominated_books => {
			return { nominated_books };
		});
	}
</script>

<script>
	import ShelfSlot from "../../components/ShelfSlot.svelte";
	export let nominated_books;
</script>

<style>
	main {
		display: grid;
		width: 100vw;
		height: 100vh;
		justify-content: center;
	}

	#book-list {
		display: flex;
		flex-direction: row;
		height: 100vh;
		width:75vw;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>

<svelte:head>
  <title>Book Club</title>
</svelte:head>

<main>
	<h1>Nominated Books</h1>
	<div id="book-list">
		{#each nominated_books as book}
			<ShelfSlot {...book} />
		{/each}
	</div>
</main>
