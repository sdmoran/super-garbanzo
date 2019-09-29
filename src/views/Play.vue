<template>
    <div class="play">
        <h1>This is the Play view!</h1>
        <p>Your name: {{this.$store.state.name}}</p>
        <p>Your questions:</p>
        <Question v-for="question in this.$store.state.questions"
        :key="question"
        :text="question">
        </Question>
    </div>
</template>

<script>
import Question from '@/components/Question'
export default {
    name: "Play",
    components: {
        Question
    }
}
</script>