<script>
    import ProgressOptionsBar from "../../components/ProgressOptionsBar.svelte";  
    import ProgressArea from "../../components/ProgressArea.svelte";  
    

    export let membersData = ["Sean Zhu", "David Luo"]
    export let checkpointsData = ["June 17", "June 18"]


</script>

<main>
    <div id="progress-area-container">
        <ProgressArea 
        membersData={membersData} 
        checkpointsData={checkpointsData}>
        
        </ProgressArea>
    </div>
</main>

<style>
    /* .layout {
        width: 100vw;
        height: 100vh;
        background-color: aqua;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 50px 1fr;
        grid-template-areas:
            "header"
            "body";
    }
    
    #progress-options-bar-container {
        grid-area: "header";
        width: 100%;
        height: 100%;
    } */

/*     
    #progress-area-container {
        grid-area: "body";
        display: flex;

    } */
</style>