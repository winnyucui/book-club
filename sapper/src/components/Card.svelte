<!-- By default custom elements are compiled with accessors: true, which means that any props are exposed as properties of the DOM element. To prevent this, add accessors={false} to svelte:options.-->
<!-- <svelte:options tag="a-slot" accessors={false} /> -->


<script>
    export let id;
    export let type;
    export let active;
    export let title;
    export let author;
    export let image;
    export let nominator;
    export let comments;

    console.log("HERE I AM", active)
</script>


<!-- HTML SECTION -->
<link href="https://fonts.googleapis.com/css2?family=Neuton:wght@700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Alike&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Yrsa:wght@300&display=swap" rel="stylesheet">

<div id="card" class="card {type} {active ? "active" : "inactive"}">
    <div id="header">
        <div id="title">{title}</div>
        <div id="author">{author}</div>
    </div>
    <div id="image">
        <img src={image} alt="Smiley face">
    </div>
    <div id="text-box">
        <div id="nominator">{nominator}</div>
        <div id="comments">{comments}</div>
    </div>
</div>

<!-- CSS SECTION -->
<style>
    

    .card {
        
        display: grid;
        grid-template-columns: [line1] 1fr [line2] 1.5fr [line3];
        grid-template-rows: [row1-start] 20% [row1-end] 80% [third-line];
        grid-template-areas:
            "header header"
            "image description";
        padding: 30px;
        margin: 15px;
        width: 500px;
        height: 315px;
        flex-grow: 1px;
        background-color: lightblue;
    }

    .card:not(:last-child) {
        position: absolute;
    }

    /* .card:hover {
        transform: rotateX(180deg);
        transition: 1s;
        transform-style: preserve-3d;
        opacity: 0;
    } */



    .active {
        opacity: 1;
        z-index: 2;
    }

    /* if type== lottery, make opacity 0
    if type== shelf, make opacity .5
     */
    .inactive {
        opacity: 0;
    }

    #header {
        grid-area: header;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
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
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        /* justify-self: center; */
    }

    #text-box {
        grid-area: description;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Yrsa', serif;
        /* justify-self: center; */
    }

    #comments {
        max-width: 75%;
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

