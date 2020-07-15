
<script>
// [] : give options to sort clubs in club list by: alphabetical order, mru
export let first_name_string = "Winn"
export let clubs_list = ["pandemic-club", "fight-club"]
</script>

<div class="home-container">
    <div class="sign-post">
        Hello {first_name_string}! Welcome home.
    </div>
    
    <div class="club-list-container">
        Here are your clubs:
        <div class="club-list">
            {#each clubs_list as club, i}
                <div>
                    <a href='club/{club}'>{club}</a>
                </div>
            {/each}
        </div>
    </div>

</div>

<style>
    .home-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }




</style>

