<template>
    <div class="container" id="VoteCard">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{this.text}}</h5>
                <button type="submit" v-if="show" v-on:click="sendVote()">Vote</button>
                <!-- Display ONLY if score is not "false"; this prevents undesirable behavior when score is 0. -->
                <h3 v-if="score !== false">Score: {{this.score}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
const API = require('../../server/api');

export default {
    name: "Vote",
    props: ['text', 'id', 'show', 'score'],
    data: function() {
        return {
            
        }
    },
    methods: {
        sendVote() {
            this.$emit('hasVoted');
            API.vote(this.id);
        }
    },
    mounted() {

    }
}
</script>