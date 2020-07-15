<script context="module">
	export function preload({ params, query }) {
        return this.fetch(`nominated-books/lottery.json`)
        .then(r => r.json())
        .then(lottery_details => {
			return { lottery_details };
		});
	}
</script>

<script>
    import { onMount } from 'svelte';
    import Timer from "../../../components/Timer.svelte";    
    import Lottery from "../../../components/Lottery.svelte";

    export let lottery_details;
    export let number_of_slots = 3;

    // !: export functions below to lower abstraction layer
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            // 'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
            clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }
    // !: export functions above to lower abstraction layer

    // export let lottery_details;
    export let books = lottery_details.nomination_data;
    console.log("REISNTRESI", books)    
    export let countdown = getTimeRemaining(lottery_details.club_data.end_date)
    // export let nominated_books = 

    function initialize_lottery(nominated_books, number_of_slots) {
        let sequence = [...Array(nominated_books.length).keys()]
        
        let active_books = []
        while (active_books.length < number_of_slots) {
            let r = Math.floor(Math.random() * sequence.length)
            active_books.push(sequence[r])
            sequence.splice(r,1)   
        }
        return active_books
    }
    export let active_books = initialize_lottery(books, number_of_slots)
    console.log("SQUAL", active_books)

    onMount(() => {
        var deadline = lottery_details.club_data.end_date
        initializeClock('clock', deadline);
    });
    
</script>


<div id="nominated-books-container">
    <div id="header-container">
        <div id="title">
            The Countdown!!
        </div>
    </div>
    <div id="timer-container">
        <Timer {...countdown}/>
    </div>
    <div id="lottery-container">
        <Lottery 
            books={books} 
            activeBooks={active_books} 
            numberOfSlots={number_of_slots}/>
    </div>
</div>



<style>
    #nominated-books-container {
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        grid-template-rows: 75px 125px 1fr;
        grid-template-areas:
            "header header header"
            "timer timer timer"
            "lottery lottery lottery";
    }

    #header-container {
        grid-area: header;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #timer-container {
        grid-area: timer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #lottery-container {
        grid-area: lottery;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>

