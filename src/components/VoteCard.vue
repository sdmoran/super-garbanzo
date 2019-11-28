<template>
    <div class="container" id="VoteCard">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{this.text}}</h5>
                <p>{{this.id}}</p>
                <button type="submit" v-on:click="sendVote()">Vote</button>
            </div>
        </div>
    </div>
</template>

<script>
const API = require('../../server/api');

export default {
    name: "Vote",
    props: ['text', 'id'],
    methods: {
        sendVote() {
            API.vote(this.id);
        }
    },
    data: function() {
        return {
            
        }
    },
    mounted() {

    }
}
</script>