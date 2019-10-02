<template>
    <div class="container" id="Question">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{text}}</h5>
                <input class="form-control" v-model="answer">
                <button type="submit" class="btn btn-primary" style="margin-top: 1rem" v-on:click="nextQuestion()">Submit Answer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Question",
    props: ['text'],
    computed: {
        ...mapGetters([
            'moreQuestions',
        ])
    },
    methods: {
        nextQuestion() {
            this.$store.commit('answer', this.answer)
            this.$store.commit('incrementQuestion')
            this.answer = null
            if(!this.moreQuestions) {
                this.$emit('done')
            }
        }
    },
    data: function() {
        return {
            answer: null,
        }
    }
}
</script>