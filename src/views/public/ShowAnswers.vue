<template>
  <div class="showplayers">
    <h1>This is the page with a list of answered questions.</h1>
            <div class="card mx-auto" style="width: 20rem;" v-for="q in questions" :key="q.question">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{q.question}}</h5>
                    <p>{{q.answer}}</p>
                </div>
            </div>
    <button v-on:click="refresh()">refreshhhh</button>
  </div>
</template>

<script>
const API = require('../../../server/api');

export default {
    data: function() {
        return {
            msg: "Hello!",
            socket: this.$store.state.socket,
            questions: [],
        }
    },
    methods: {
        refresh: function() {
          API.getAnsweredQuestions().then( (res) => {
            console.log(res.data);
            this.questions = res.data;
        });
        }   
    },
    mounted() {
        this.refresh();
        this.socket.on('questionsAnswered', () => {
            this.refresh();
        });
    }
}

</script>