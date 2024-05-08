<script>
    import '$scss/set/common.scss'
    import { spring } from 'svelte/motion'
    import Lenis from '@studio-freight/lenis'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
    import { throttle } from '$js/utils'
    import Quick from '$comp/quick/Quick.svelte';

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    let isMobile = window.matchMedia('(pointer:coarse)').matches;
    let strokeOffset = 160;
    let rotates = { x:30, y:15 }
    const mousePos = spring({ x:0, y:0 }, { stiffness:0.5 });
    const onMouseMove = (event) => {
        $mousePos = { x:event.x, y:event.y }
    }
    const onResize = () => {
        isMobile = window.matchMedia('(pointer:coarse)').matches;
    }
    const onScroll = () => {
        let progress = scrollY / (document.getElementById('app').offsetHeight - innerHeight);
        strokeOffset = 160 - progress*160;
        rotates.x = 360 * progress - 10;
        rotates.y = 360 * progress - 5;
        console.log(progress)
    }

    
    let lenis = new Lenis({
        syncTouch: true,
        syncTouchLerp: 0.1
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1400)
    });
    gsap.ticker.lagSmoothing(0);

    function scrollTo(target){
        gsap.to(window, { scrollTo: target })
    }
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>
<svelte:window 
    on:mousemove={onMouseMove}
    on:resize={onResize}
    on:scroll={throttle(onScroll, 50)}
/>

{#if !isMobile}
<div 
    class="cursor"
    style:--x={`${$mousePos.x}px`}
    style:--y={`${$mousePos.y}px`}
>
</div>
{/if}
<Quick { strokeOffset } { scrollTo } />
{#if isMobile}
<main style:--rotateX={`${rotates.x}deg`} style:--rotateY={`${rotates.y}deg`} data-lenis-prevent>
    <slot />
</main>
{:else}
<main style:--rotateX={`${rotates.x}deg`} style:--rotateY={`${rotates.y}deg`}>
    <slot />
</main>
{/if}
