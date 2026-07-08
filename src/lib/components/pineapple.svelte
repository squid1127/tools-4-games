<script lang="ts">
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { fly } from "svelte/transition";

  let pineapple = $state(0);
</script>

<Card.Root class="my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>How Many Pineapples?</Card.Title>
  </Card.Header>
  <Card.Content>
    {#key pineapple}
      <p class="text-4xl font-bold" in:fly={{ y: -10, duration: 200 }}>
        {pineapple}
      </p>
    {/key}
    <p class="text-sm text-muted-foreground">
      Pineapple
    </p>
    <br/>
    <Button onclick={() => pineapple++} class="w-full">
      Add Another <ArrowUpIcon />
    </Button>
  </Card.Content>
</Card.Root>
