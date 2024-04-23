<script>
    import '$scss/set/common.scss'
    import { page } from '$app/stores'
    import { beforeNavigate } from '$app/navigation'
    import { onMount } from 'svelte'
    import { spring } from 'svelte/motion'

    let cursor, scrollY;
    let isMobile = window.matchMedia('(pointer:coarse)').matches;
    let quick = $page.url.pathname.includes('list')? false: true;
    const mousePos = spring({ x:0, y:0 });
    const onMouseMove = (event) => {
        $mousePos = { x:event.x, y:event.y }
    }
    const onResize = () => {
        isMobile = window.matchMedia('(pointer:coarse)').matches;
    }

    beforeNavigate(() => {
        quick = $page.url.pathname.includes('list')? true: false
    });

    onMount(() => {
        
    })
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>
<svelte:window 
    on:mousemove={onMouseMove}
    on:resize={onResize}
    bind:scrollY={scrollY}
/>

{#if !isMobile}
<div 
    class="cursor"
    style:--x={`${$mousePos.x}px`}
    style:--y={`${$mousePos.y}px`}
    bind:this={cursor}
>
</div>
{/if}
<main>
    <slot />
</main>