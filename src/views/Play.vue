<template>
    <div class="play">
        <h1>This is the Play view!</h1>
        <p>Your name: {{this.$store.state.name}}</p>
        <p>Your questions:</p>
        <Question v-if="this.$store.state.index < this.$store.state.questions.length" :text="this.$store.state.questions[this.$store.state.index]">
        </Question>
        <p v-else>
            All done!
        </p>
    </div>
</template>

<script>
import Question from '@/components/Question'
export default {
    name: "Play",
    components: {
        Question
    },
    data: function() {
        return {
            
        }
    }
}
</script>