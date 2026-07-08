<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import * as Item from "$lib/components/ui/item";
  import { Info } from "@lucide/svelte";

  import { appStore } from "$lib/stores/app-store.svelte";

</script>

<Card.Root class="my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>squid1127/tools-for-games</Card.Title>
  </Card.Header>
  <Card.Content class="flex flex-col gap-3">
    <Item.Root variant="outline" size="sm">
      <Item.Content>
        <Item.Title>Test</Item.Title>
        <Item.Description>A simple test page</Item.Description>
      </Item.Content>

      <Item.Actions>
        <Button onclick={() => (appStore.value.currentPage = "pineapple")} size="sm">Open</Button>
      </Item.Actions>
    </Item.Root>
    <Alert.Root>
      <Info />
      <Alert.Title>Work in Progress</Alert.Title>
      <Alert.Description>
        This project is largely a work in progress and is far from being
        finished.
      </Alert.Description>
    </Alert.Root>
  </Card.Content>
</Card.Root>
