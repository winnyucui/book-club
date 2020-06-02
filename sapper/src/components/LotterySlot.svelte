<script>
    import Card from "./Card.svelte";
    import ShelfSlot from "./ShelfSlot.svelte";
    import { onMount, afterUpdate, onDestroy, tick } from 'svelte';
    import { fade } from 'svelte/transition';
    export let books;
    export let type = "lottery"
    export let id;
    export let activeBook;
    export let active_details = active_index_to_array(activeBook)
    export let spins;
    
    async function extract_active_details(books) {
        console.log("IN THIS FUN", books)
        let active_details = books.map((book) => {
            return book.active
        })
        return active_details
    };

    function active_index_to_array(active_index){
        let c = 0
        let active_array = new Array(books.length)
        active_array.splice(active_index, 1, true)
        console.log("BAHHAHAAH", Array.from(active_array.values()))
        return Array.from(active_array.values())
    }

    console.log("???", active_details)

    async function shift_array_right() {
        let last_element = active_details.pop()
        active_details.unshift(last_element)
        active_details = active_details
        console.log("I AM FIRING")
    }


    function updateBooksActiveField(books, ) {
        books.forEach((book) => {
            book.active =
            console.log("HELLO", book.active)
        })
    }


    function test() {
        console.log("WTF")
    }

    // [] : extract customization variables, propagate to top component to allow for easy customization of lottery 
    // [] : add more fine-grained functionality, propogate implementation details downward (e.g. hiding card contents when backside is facing)
    // [] : after the lottery is done, make the border turn green to indicate the book is selected
    var degree = 0
    var transition_invelocity = 500
    var transition_inacceleration = -100
    var front_side = true
    async function flipSlot() {
        transition_invelocity += -1 * transition_inacceleration
        degree += 180;
        front_side = !front_side
        var lottery_slot = document.getElementById("lottery-slot-"+id)
        if (front_side) {
            lottery_slot.style.zIndex = 1
            lottery_slot.style.backgroundColor = "black"
            lottery_slot.style.opacity = 1
        } else {
            lottery_slot.style.zIndex = 10
            lottery_slot.style.backgroundColor = "skyblue"
            setTimeout(shift_array_right, transition_invelocity)
        }

        lottery_slot.style.transform = "rotateX(" + degree + "deg)";
        lottery_slot.style.transitionDuration = transition_invelocity + "ms"
        lottery_slot.style.transitionTimingFunction = "ease"
    }

    var frame_invelocity = 200
    var frame_inacceleration = -100
    var adjusted_spins = spins * 2
    
    export let delay;

    function spin() {
        if (adjusted_spins != 0 ) {
            frame_invelocity += -1 * frame_inacceleration
            setTimeout(flipSlot, frame_invelocity)
            setTimeout(spin, frame_invelocity)
            adjusted_spins -= 1
        }
    }
    

    onMount( () => {
        setTimeout(spin, delay)
    })
    
    console.log("ACTIVE DETAILS", active_details)
    
</script>

<div>{spins}</div>
<div class="lottery-slot" id="lottery-slot-{id}" in:fade="{{ duration: 100}}" out:fade="{{ duration: 100}}">
    {#each books as book, i}
        <!-- {console.log("HEHE", book)} -->
        <Card id={i} {...book} active={active_details[i]} type={type} />
    {/each}
</div>

<style>
    .lottery-slot {
        position: relative;
        /* background-color: burlywood */
        /* fill:  */
    }


    /* .fade-in {
        animation: fadeIn ease 10s;
        -webkit-animation: fadeIn ease 10s;
        -moz-animation: fadeIn ease 10s;
        -o-animation: fadeIn ease 10s;
        -ms-animation: fadeIn ease 10s;
    } */


    @keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    @-moz-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    @-webkit-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    @-o-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    @-ms-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    /* .lottery-slot.active {
        transform: rotateX(180deg);
        transition: 1s;
        transform-style: preserve-3d;
    } */

</style>