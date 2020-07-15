

<script>
    import CheckpointDetails from "./CheckpointDetails.svelte";
    export let date;
    export let isEndOfCycle;
    export let numberOfSubmissionBlocks;
    export let hasBeenSubmitted;

    export let isVisible = false;

    function showCheckpointDetails() {
        isVisible = !isVisible
        console.log(isVisible)
    }
</script>






<main>
    {#if isVisible} 
        <CheckpointDetails 
        isVisible={isVisible}
        clickHandler={showCheckpointDetails}
        numberOfSubmissionBlocks={numberOfSubmissionBlocks}
        date={date}
        />
    {/if}
    <div class="checkpoint-container">
        <!-- <div class="date">
            {date}
        </div> -->

        {#if hasBeenSubmitted} 
            <div class="checkpoint submitted" on:click={showCheckpointDetails}>
                {#if isEndOfCycle} 
                    <div class="cycle-end-symbol"> ! </div>
                {/if}
            </div>
        {:else}
            <div class="checkpoint unsubmitted" on:click={showCheckpointDetails}>
                {#if isEndOfCycle} 
                    <div class="cycle-end-symbol"> ! </div>
                {/if}
            </div>
        {/if}

    </div>
</main>



<style>
    /* .details-positioner {
        height: 100vh;
        width: 100vw;
    } */

    .checkpoint-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 25px 0px 25px;
        
    }
    .checkpoint {
        border-radius: 50%;
        background-color: rgb(201, 201, 196);
        height: 25px;
        width: 25px;
        margin: 0px 20px 20px 20px;
    }

    .checkpoint.submitted {
        background-color: green;
    }

    .cycle-end-symbol {
        text-align: center;
    }

</style>