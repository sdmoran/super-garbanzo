<template>
    <div class="container" id="VoteCard">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{this.text}}</h5>
                <button type="submit" v-if="show" v-on:click="sendVote()">Vote</button>
                <!-- Display ONLY if score is not "false"; this prevents undesirable behavior when score is 0. -->
                <div class="display-votes" v-if="votes !== false">
                    <h3>Votes: {{this.votes.length}}</h3>
                    <p v-for="v in votes" :key="v">{{v}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const API = require('../../server/api');

export default {
    name: "Vote",
    props: ['text', 'id', 'show', 'votes'],
    data: function() {
        return {
            
        }
    },
    methods: {
        sendVote() {
            this.$emit('hasVoted');
            API.vote(this.id, this.$store.state.name);
        }
    },
    mounted() {

    }
}
</script>