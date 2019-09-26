<template>
    <div class="play">
        <h1>This is the Play view!</h1>
        <p>Your name: {{this.$store.state.name}}</p>
        <p>Your questions:</p>
        <ol>
            <li v-for="question in this.$store.state.questions" :key="question">{{question}}</li>
        </ol>
    </div>
</template>

<script>
export default {
    
}
</script>