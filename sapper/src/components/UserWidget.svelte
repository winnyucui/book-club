<script>
    export let memberInitials;

</script>

<main>
    <div class="user-widget-container">
        <!-- <img src="http://placekitten.com/200/300" alt="user profile image"> -->
    
        <div class="initials">
            {memberInitials}
        </div>
    
    </div>

</main>


<style>
    .user-widget-container {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: red;
        /* margin: 0px 10px 0px 50px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        height: auto; 
        width: auto; 
        max-width: 50px; 
        max-height: 50px;
    }

    .initials {
        
    }

</style>