
<script>

    export let days;
    export let hours;
    export let minutes;
    export let seconds;

</script>

<style>
    #clock{
        font-family: sans-serif;
        color: #fff;
        display: inline-block;
        font-weight: 100;
        text-align: center;
        font-size: 30px;
    }

    #clock > div{
        padding: 10px;
        border-radius: 3px;
        background: #00BF96;
        display: inline-block;
    }

    #clock div > span{
        padding: 15px;
        border-radius: 3px;
        background: #00816A;
        display: inline-block;
    }

    .smalltext{
        padding-top: 5px;
        font-size: 16px;
    }
</style>


<div id="clock">
  <div>
    <span class="days">{days}</span>
    <div class="smalltext">Days</div>
  </div>
  <div>
    <span class="hours">{hours}</span>
    <div class="smalltext">Hours</div>
  </div>
  <div>
    <span class="minutes">{minutes}</span>
    <div class="smalltext">Minutes</div>
  </div>
  <div>
    <span class="seconds">{seconds}</span>
    <div class="smalltext">Seconds</div>
  </div>
</div>