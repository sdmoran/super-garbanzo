<template>
    <div class="container" id="Question">
        <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{text}}</h5>
                <input class="form-control">
                <button type="submit" class="btn btn-primary" style="margin-top: 1rem">Submit Answer</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Question",
    props: ['text']
}
</script>