

<script>
    import UserWidget from "./UserWidget.svelte"
    import ProgressTracker from "./ProgressTracker.svelte"


    // export let memberInitials;
    // export let checkpoints = [
    //     {
    //         "date": "June 17, 2020 22:00:00", 
    //         "is_end_of_cycle": false,
    //         "number_of_submission_blocks": 5,
    //         "has_been_submitted": true
            
    //     },
    //     {
    //         "date": "June 18, 2020 22:00:00", 
    //         "is_end_of_cycle": true,
    //         "number_of_submission_blocks": 5,
    //         "has_been_submitted": false

    //     }
    // ]

    export let memberInitials;
    export let checkpoints;


</script>



<main>
    <div class="progress-area-row">
        <UserWidget memberInitials={memberInitials}></UserWidget>
        <ProgressTracker checkpoints={checkpoints}></ProgressTracker>
    </div>
</main>


<style>
    .progress-area-row {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 100px;
        background-color: white;
        align-items: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        margin: 10px 20px;
    }


</style>