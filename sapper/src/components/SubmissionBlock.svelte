<main>
    <!-- <div>What question can you think of that might challenge others?</div>
    <div>What is the answer to your question?</div>
    <div>What page reveals the answer?</div> -->

    <form>
        <label for="question">Question</label>
        <input required type="question" id="question" />

        <label for="answer">Answer</label>
        <input required type="answer" id="answer" />

        <label for="page-reference">Page reference</label>
        <input required type="page-reference" id="page-reference" />
        
        <!-- <button type="submit">Finish checkpoint</button> -->
    </form>

</main>

<style>
    form {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

</style>