<svelte:options tag="a-slot" />

<!-- HTML SECTION -->
<link href="https://fonts.googleapis.com/css2?family=Neuton:wght@700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Alike&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Yrsa:wght@300&display=swap" rel="stylesheet">

<div id="slot">
    <div id="header">
        <div id="title">Harry Potter and the Sorcerer's Stone</div>
        <div id="author">J.K. Rowling</div>
    </div>
    <img id="image" src="https://via.placeholder.com/200x300" alt="Smiley face">
    <div id="text-box">
        Cina says:
        blah blah blah
    </div>

</div>

<!-- CSS SECTION -->
<style>
    #slot {
        display: grid;
        width: 600px;
        height: 400px;
        background-color: lightblue;
    }

    #header {
        grid-area: header;
        justify-self: center;
    }

    #title {
        font-family: 'Neuton', serif;
        font-size: 30px;
    }

    #author {
        font-family: 'Alike', serif;
        font-size: 15px;
    }

    #image {
        grid-area: image;
        justify-self: center;
    }

    #text-box {
        grid-area: description;
        font-family: 'Yrsa', serif;
        justify-self: center;

    }

    #slot {
        grid-template-columns: [line1] 1fr [line2] 1fr [line3];
        grid-template-rows: [row1-start] 20% [row1-end] 80% [third-line];
        grid-template-areas:
            "header header"
            "image description";
    }
</style>

<!-- <style type="text/stylus">
	#slot
		display grid
		width 600px
		height 400px
		background-color lightblue
		grid-template-columns [line1] 1fr [line2] 1fr [line3]
		grid-template-rows [row1-start] 20% [row1-end] 80% [third-line]
		grid-template-areas "header header"
				"image description"

	#header
		grid-area header
		justify-self center

	#title
		font-family 'Neuton', serif
		font-size 30px

	#author
		font-family 'Alike', serif
		font-size 15px

	#image
		grid-area image
		justify-self center

	#text-box
		grid-area description
		font-family 'Yrsa', serif
		justify-self center
</style> -->

<!-- JS SECTION -->
<script>
	export default {
		tag: 'my-box'
	};
</script>
