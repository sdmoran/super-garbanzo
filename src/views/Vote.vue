<template>
  <div class="vote">
    <h1>This is the Vote view!</h1>
    <h2>Current Question:</h2>
    <h2>{{this.questionText}}</h2>
    <div class="container">
      <div class="row">
          <span class="col-2"></span>
          <VoteCard class="col" :text="this.q1text"></VoteCard>
          <VoteCard class="col" :text="this.q2text"></VoteCard>
          <span class="col-2"></span>
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
          q2text: "",
        }
      },
      mounted() {
        this.$store.state.socket.on('questionPair', (qs) => {
          this.questionText = qs[0].question;
          this.q1text = qs[0].answer;
          this.q2text = qs[1].answer;
        });
      }
}
</script>