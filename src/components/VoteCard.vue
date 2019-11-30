<template>
    <div class="container" id="VoteCard">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{this.text}}</h5>
                <button type="submit" v-if="!hasVoted" v-on:click="sendVote()">Vote</button>
            </div>
        </div>
    </div>
</template>

<script>
const API = require('../../server/api');

export default {
    name: "Vote",
    props: ['text', 'id'],
    data: function() {
        return {
            hasVoted: false,
        }
    },
    methods: {
        sendVote() {
            console.log("Sending hasvoted...")
            this.$emit('hasVoted');
            API.vote(this.id);
        }
    },
    mounted() {

    }
}
</script>