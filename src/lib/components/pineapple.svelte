<script lang="ts">
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { appStore } from "$lib/stores/app-store.svelte";
  import { fly } from "svelte/transition";
  import { Info } from "@lucide/svelte";
</script>

<div class="container flex flex-col gap-3 text-muted">
  <Card.Root class="mb-4 w-full max-w-sm">
    <Card.Header>
      <Card.Title>How Many Pineapples?</Card.Title>
    </Card.Header>
    <Card.Content class="flex flex-col gap-3">
      <section>
        {#key appStore.value.pineappleCount}
          <p class="text-4xl font-bold" in:fly={{ y: -10, duration: 200 }}>
            {appStore.value.pineappleCount}
          </p>
        {/key}
        <p class="text-sm text-muted-foreground mb-2">Pineapple</p>
      </section>

        <Button
          onclick={() => appStore.value.pineappleCount++}
          class="flex-auto"
        >
          Add Another <ArrowUpIcon />
        </Button>
        <Alert.Root>
          <Info />
          <Alert.Title>Proof of concept</Alert.Title>
          <Alert.Description>
            This is a proof of concept as my first svelte project! Will lock in
            soon enough
          </Alert.Description>
        </Alert.Root>
        <Button
          onclick={() => (appStore.value.currentPage = "home")}
          variant="secondary"
          // size="sm"
        >
          <ArrowLeftIcon /> Return
        </Button>
    </Card.Content>
  </Card.Root>
</div>
