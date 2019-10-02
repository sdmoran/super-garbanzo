<template>
    <div class="play">
        <h1>This is the Play view!</h1>
        <p>Your name: {{this.$store.state.name}}</p>
        <div v-if="this.$store.state.index < this.$store.state.questions.length">
            <p>Your questions:</p>
            <!-- Wow this line is ugly. TODO figure out how to make it less ugly -->
            <Question :text="this.$store.state.questions[this.$store.state.index].question" @done="sendAnswers()">
            </Question>
        </div>
        <p v-else>
            All done!
        </p>
    </div>
</template>

<script>
import Question from '@/components/Question'
const API = require('../../server/api');

export default {
    name: "Play",
    components: {
        Question
    },
    data: function() {
        return {

        }
    },
    methods: {
        sendAnswers() {
            API.sendQuestions(this.$store.state.name, this.$store.state.questions)
            .then(() =>  {
                console.log("Questions received by server!")
            })
            .catch(() => {
                console.log("Something went wrong with the server!")
            })
        }
    },
}
</script>