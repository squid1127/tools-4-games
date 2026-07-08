<script lang="ts">
  import PineappleCounter from "$lib/components/pineapple.svelte";
  import Homepage from "$lib/components/homepage.svelte";
  import { appStore } from "$lib/stores/app-store.svelte";

</script>

<div
  class="transition-colors bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 dark"
>
  <div class="flex w-full max-w-sm flex-col gap-6">
    {#if appStore.value.currentPage === 'home'}
      <Homepage />
    {:else if appStore.value.currentPage === 'pineapple'}
      <PineappleCounter />
    {/if}
  </div>
</div>
