<script>
    import '$scss/set/quick.scss'
    import Fa from 'svelte-fa'
    import Blobs from './Blobs.svelte'
    import Ham from './Ham.svelte'
    import Menu from './Menu.svelte';

    export let w, strokeOffset, scrollTo;
    
    let show = false;
    function gnbOpen(){
        show = !show
    }
</script>

<div class="quick">
    <Blobs { show } { w } { strokeOffset } />
    <Ham { show } { gnbOpen } { Fa } />
    {#if show}
    <Menu { Fa } { scrollTo } />
    {/if}
</div>