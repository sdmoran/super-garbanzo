<template>
  <div class="vote">
    <h1>This is the Vote view!</h1>
    <h2>Seconds left: {{this.timeLeft}}</h2>
    <h2>Current Question:</h2>
    <h2>{{this.questionText}}</h2>
    <div class="container">
      <div class="row">
          <VoteCard class="col-sm-6" @hasVoted="hide()" :text="this.q1text" :id="this.q1id" :show="this.show" :score="this.q1score"></VoteCard>
          <VoteCard class="col-sm-6" @hasVoted="hide()" :text="this.q2text" :id="this.q2id" :show="this.show" :score="this.q2score"></VoteCard>
      </div>
    </div>
  </div>
</template>

<script>
import VoteCard from '@/components/VoteCard'
export default {
      name: "Play",
      components: {
        VoteCard
      },
      data: function() {
        return {
          questionText: "",
          q1text: "",
          q1id: 0,
          q2text: "",
          q2id: 0,
          q1score: false,
          q2score: false,
          timeLeft: 0,
          show: true
        }
      },
      methods: {
        hide() {
          this.show = false
        }
      },
      mounted() {
        this.$store.state.socket.on('questionPair', (qs) => {
          this.questionText = qs[0].question;
          this.q1text = qs[0].answer;
          this.q1id = qs[0].id;
          this.q2text = qs[1].answer;
          this.q2id = qs[1].id;
          this.q1score = false;
          this.q2score = false;
        });
        this.$store.state.socket.on('tickDown', (timeLeft) => {
          this.timeLeft = timeLeft;
        });
        this.$store.state.socket.on('showScores', (questions) => {
          this.q1score = questions[0].score;
          this.q2score = questions[1].score;
        });
      }
}
</script>