


<script>
    import SubmissionBlock from "./SubmissionBlock.svelte"
    export let isVisible;
    export let clickHandler;
    export let numberOfSubmissionBlocks;
    export let date;
    function showCheckpointDetails() {
        isVisible = !isVisible
        console.log(isVisible)
    }

    

</script>


<main>
    {#if isVisible}
    <div class="positioner">
        <div class="checkpoint-details-container">
            <div class="bar">
                <div class="checkpoint-title">
                    Checkpoint for {date}
                </div>
                <div class="exit-button"> 
                    <div class="exit-button-symbol" on:click={clickHandler}>
                    x
                    </div>
                </div>
            </div>
            
            <div class="checkpoint-description"> 
                Submit {numberOfSubmissionBlocks} questions and answers to finish this checkpoint.
            </div>
            <div class="submission-blocks">
                {#each Array(numberOfSubmissionBlocks) as _, i}
                    <SubmissionBlock />
                {/each}
            </div>
            
            <button type="submit">Finish checkpoint</button>
        
        </div>
    </div>
    {/if}
</main>



<style>
    .positioner {
        position: fixed;
        z-index:2;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .checkpoint-details-container {
        display: grid;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
            "header"
            "description"
            "main";
        position: absolute;
        z-index: 2;
        width: 50vw;
        height: 50vh;
        background-color: lightblue;
        grid-area: "main";
        overflow: auto;

    }

    .checkpoint-description {
        padding: 20px 40px;
    }

    .bar {
        grid-area: "header";
        background-color: black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }
    
    .checkpoint-title {
        margin-left: 20px;
        color: white
    }

    .exit-button {
        margin-right: 20px;
        background-color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .submission-blocks {
        grid-area: "main";
        padding: 20px 40px;
    }

    button {
        padding: 40px;
        background-color: steelblue;
        font-size: 25px;
        cursor: pointer;

    }
    
    
    /* .checkpoint-details-con {
        position: absolute;
        z-index: 2;
        width: 500px;
        height: 500px;
        background-color: brown;
        grid-area: "main";
    } */


</style>