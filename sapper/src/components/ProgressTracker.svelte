<script>
    import Checkpoint from "./Checkpoint.svelte"



    export let checkpoints;
</script>




<main>
    <div class="progress-tracker-container">
        {#each checkpoints as checkpoint, i}
            <Checkpoint 
            date={checkpoint.date}
            isEndOfCycle={checkpoint.isEndOfCycle}
            numberOfSubmissionBlocks={checkpoint.numberOfSubmissionBlocks}
            hasBeenSubmitted={checkpoint.hasBeenSubmitted}
            />
	    {/each}
    
    </div>
</main>


<style>
    .progress-tracker-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: white;
    }

</style>




