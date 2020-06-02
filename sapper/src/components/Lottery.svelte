<script>
    import LotterySlot from "./LotterySlot.svelte";
    export let book1 = {
        active: true,
        // class: slot,
		title: "Harry Potter and the Sorcerer's Stone",
		author: "J.K. Rowling",
		image: "https://via.placeholder.com/200x300",
		nominator: "Cina",
		comments: "blah blah blah blah"
    };
    export let book2 = {
        active: false,
        // class: slot,
		title: "Harry Potter the Prisoner of Azkaban",
		author: "J.K. Rowling",
		image: "https://via.placeholder.com/200x300",
		nominator: "Cina",
		comments: "blah blah blah blah"
    };
    export let book3 = {
        active: false,
        // class: slot,
		title: "Harry Potter and the Chamber of Secrets",
		author: "J.K. Rowling",
		image: "https://via.placeholder.com/200x300",
		nominator: "Cina",
		comments: "blah blah blah blah"
	};

    export let all_spins = [
        3, 6, 9
    ]
    export let all_delays = [
        100, 300, 800
    ]
    // export let nominated_books = [book, book, book, book, book];
    // dont need to send duplicate of data, pass in the (rate, time) function and the list once. will be deterministic result for all members
    // export let slot_books = [
    //     {"slot": "1", "books": [book1, book2, book3]},
    //     {"slot": "2", "books": [book1, book2, book3]},
    //     {"slot": "3", "books": [book1, book2, book3]},
    // ]
    
    export let all_books = [
        book1, book2, book3
    ]

    export let books;
    export let activeBooks;
    export let numberOfSlots;

</script>


<!-- HTML SECTION -->
<div id="lottery">  
    {#each Array(numberOfSlots) as _, i}
        <LotterySlot 
            id={i} 
            books={books} 
            spins={all_spins[i]} 
            delay={all_delays[i]}
            activeBook={activeBooks[i]}
            />
    {/each}
</div>

<!-- CSS SECTION -->

<style>
    #lottery {
        display: flex;
        flex-direction: row;
    }
</style>