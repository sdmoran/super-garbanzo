<template>
    <div class="play">
        <h1>This is the Play view!</h1>
        <h2>Seconds left: {{this.timeLeft}}</h2>
        <p>Your name: {{this.$store.state.name}}</p>
        <div v-if="this.$store.state.index < this.$store.state.questions.length && this.timeLeft > 0">
            <p>Your questions:</p>
            <!-- Wow this line is ugly. TODO figure out how to make it less ugly -->
            <Question ref="q" :text="this.$store.state.questions[this.$store.state.index].question" @done="sendAnswers()">
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
            timeLeft: 0,
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
    mounted() {
    API.getTime().then((res) => {
        console.log(res.data);
        this.timeLeft = res.data.seconds_left;
    });
    this.$store.state.socket.on('tickDown', (timeLeft) => {
        console.log(this.$refs.q);
      this.timeLeft = timeLeft;
    });
    this.$store.state.socket.on('timeUp', () => {
        this.sendAnswers();
    });
  }
}
</script>