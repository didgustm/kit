<script>
    import { fly } from 'svelte/transition';

    export let data
</script>

{#key data.url}
<main
    in:fly={{ x:-100, duration:300, delay:200 }}
    out:fly={{ x:100, duration:300 }}
>
    <slot />
</main>
{/key}