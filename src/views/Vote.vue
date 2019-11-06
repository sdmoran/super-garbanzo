<template>
  <div class="vote">
    <h1>This is the Vote view!</h1>
    <div class="container">
      <div class="row">
          <span class="col-2"></span>
          <VoteCard class="col"></VoteCard>
          <VoteCard class="col"></VoteCard>
          <span class="col-2"></span>
      </div>
    </div>
  </div>
</template>

<script>
import VoteCard from '@/components/VoteCard'
export default {
      name: "Play",
      components: {
        VoteCard
      },
}
</script>