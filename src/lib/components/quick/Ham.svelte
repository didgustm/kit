<script>
    import { fade } from 'svelte/transition'
    import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

    export let show, gnbOpen, Fa;
</script>

<button 
        class="ham blob01 radius"
        on:click={gnbOpen}
>
    {#if !show}
    <span class="icon-menu" in:fade={{ duration:300 }}>
        <svelte:component this={ Fa } icon={ faBars } size="1.4x" />
    </span>
    {:else}
    <span class="icon-x" in:fade={{ duration:300 }}>
        <svelte:component this={ Fa } icon={ faXmark } size="1.4x" />
    </span>
    {/if}
</button>