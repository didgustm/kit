<script>
    import '$scss/set/common.scss'
    import { spring } from 'svelte/motion'
    import { page } from '$app/stores'
    import { beforeNavigate } from '$app/navigation'
    import Lenis from '@studio-freight/lenis'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { throttle } from '$js/utils'
    import Quick from '$comp/quick/Quick.svelte';

    let w = innerWidth, isMobile = window.matchMedia('(pointer:coarse)').matches;
    let quick = $page.url.pathname.includes('list')? false: true;
    let strokeOffset = innerWidth > 500? 160: 130;
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

    let lenis = new Lenis({
        syncTouch: true
    });
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', throttle(target => {
        innerWidth > 500? strokeOffset = 160 - target.progress*160: strokeOffset = 130 - target.progress*130;
    }, 30));

    function scrollTo(target){
        lenis.scrollTo(target)
    }
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>
<svelte:window 
    on:mousemove={onMouseMove}
    on:resize={onResize}
    bind:innerWidth={w}
/>

{#if !isMobile}
<div 
    class="cursor"
    style:--x={`${$mousePos.x}px`}
    style:--y={`${$mousePos.y}px`}
>
</div>
{/if}
{#if quick}
<Quick { w } { strokeOffset } { scrollTo } />
{/if}
<main>
    <slot />
</main>