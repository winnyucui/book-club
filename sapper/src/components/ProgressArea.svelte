<script>


    import Checkpoint from "./Checkpoint.svelte"
    import CheckpointDetails from "./CheckpointDetails.svelte"
    import UserWidget from "./UserWidget.svelte"

    import ProgressTracker from "./ProgressTracker.svelte"
    import ProgressAreaRow from "./ProgressAreaRow.svelte"

    export let membersData;
    export let checkpointsData;


    export let memberStats = [
        {
            memberInitials: "WC",
            checkpoints: 
            [{
                "date": "June 17, 2020 22:00:00", 
                "isEndOfCycle": false,
                "numberOfSubmissionBlocks": 5,
                "hasBeenSubmitted": true
            },
            {
                "date": "June 18, 2020 22:00:00", 
                "isEndOfCycle": true,
                "numberOfSubmissionBlocks": 5,
                "hasBeenSubmitted": false
            }]
        },

        {
            memberInitials: "VP",
            checkpoints: 
            [{
                "date": "June 17, 2020 22:00:00", 
                "isEndOfCycle": false,
                "numberOfSubmissionBlocks": 5,
                "hasBeenSubmitted": true
            },
            {
                "date": "June 18, 2020 22:00:00", 
                "isEndOfCycle": true,
                "numberOfSubmissionBlocks": 5,
                "hasBeenSubmitted": false
            }]
        },
    ]

    export let tableHeaders = [
        {"header": "Members"},
        {"header": "Checkpoint [7/17]"},
        {"header": "Finish [7/18]"},
    ]

    // export let tableHeaders = [
    //     {
    //         "short_date": "June 17",
    //         "popup_info": {
    //             "long_date": "June 17, 2020",
    //             "time": "10:00 PM"
    //         }
    //     },
    //     {
    //         "short_date": "June 18",
    //         "popup_info": {
    //             "long_date": "June 18, 2020",
    //             "time": "10:00 PM", 
    //         }
    //     }
    // ]

    // export let cycleDates = [
    //     {date: "June 17, 2020 22:00:00"},
    //     {date: "June 18, 2020 22:00:00"},
    // ]

    // export let isVisible = false;

    // function showCheckpointDetails() {
    //     isVisible = !isVisible
    //     console.log(isVisible)
    // }

</script>


<main>
    <div class="progress-page">
        <div class="title">
            Progress Area
        </div>
        <!-- {#if isVisible} 
            <CheckpointDetails 
            isVisible={isVisible}
            clickHandler={showCheckpointDetails}
            numberOfSubmissionBlocks={numberOfSubmissionBlocks}
            date={date}
            />
        {/if} -->
        <!-- <table>
            <thead>
                <tr>
                    {#each tableHeaders as headers, i}
                    {#if i == 0}
                    <th class="members-header">
                        {headers.header}
                    </th>
                    {:else} 
                    <th class="checkpoint-headers">
                        {headers.header}
                    </th> 
                    {/if}
                    {/each} 
                </tr>
            </thead>
            <tbody>
                {#each memberStats as stats}
                <tr>
                    <td class="widget-cell">
                        <div class="widget-positioner">
                            <UserWidget memberInitials = {stats.memberInitials}/>
                        </div>
                    </td>

                    {#each stats.checkpoints as checkpoint}
                    <td class="checkpoint-cell">
                        <Checkpoint {...checkpoint} />
                    </td>
                    {/each}

                </tr>
                {/each}
            </tbody>


        </table> -->

        <!-- <div class="columns"> 
           {#each cycleDates as cycle}
                <ProgressAreaColumn {...stats} />

            {/each} 
        </div> -->
        <div class="rows">
            {#each memberStats as stats}
                <ProgressAreaRow {...stats} />

            {/each}
        </div>
    </div>
</main>


<style>
    table {
        margin: 25px 50px;
        border-collapse:collapse;
        background:#fff;
    }
    td, th {
        padding : 10px;
        border-top : 1px solid rgba(0,0,0,0.1);
        border-bottom : 1px solid rgba(0,0,0,0.1);

    }
    tbody tr:hover{
        background: #F0F8FD;
        transform: scale(1,1);
        -webkit-transform: scale(1,1);
        -moz-transform: scale(1,1);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        -webkit-box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        -moz-box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .widget-positioner {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    /* .members-header {
        width: 10%;
        max-width: 25px;
    }

    .checkpoint-headers {
        width: 10%;
        max-width: 50px;
    } */

    /* .widget-cell {
        width: 10%;
    }
    .checkpoint-cell {
        width: 10%;
    } */

    .progress-page {
        height: 100vh;
        width: 100vw;
        background-color: white;
    }

    .title {
        font-size: 50px;
        padding: 10px;
    }

    .rows {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

    }

</style>