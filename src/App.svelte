<script lang="ts">
  import PineappleCounter from "$lib/components/pineapple.svelte";
  // import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
</script>

<div
  class="dark bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <!-- <div
      class="flex items-center gap-2 self-center font-medium text-foreground"
    >
      <div
        class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
      >
        <GalleryVerticalEndIcon class="size-4" />
      </div>
      Pineapples
    </div> -->
    <PineappleCounter />
  </div>
</div>
