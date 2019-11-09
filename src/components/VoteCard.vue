<template>
    <div class="container" id="VoteCard">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{this.text}}</h5>
                <button type="submit">Vote</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Vote",
    props: ['text'],
    methods: {
        
    },
    data: function() {
        return {
            
        }
    },
    mounted() {

    }
}
</script>