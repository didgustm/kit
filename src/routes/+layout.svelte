<script>
    import '$scss/set/common.scss'
    import { spring } from 'svelte/motion'
    import Lenis from '@studio-freight/lenis'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { throttle } from '$js/utils'
    import Quick from '$comp/quick/Quick.svelte';

    let isMobile = window.matchMedia('(pointer:coarse)').matches;
    let strokeOffset = 160;
    const mousePos = spring({ x:0, y:0 }, { stiffness:0.5 });
    const onMouseMove = (event) => {
        $mousePos = { x:event.x, y:event.y }
    }
    const onResize = () => {
        isMobile = window.matchMedia('(pointer:coarse)').matches;
    }

    let lenis = new Lenis({
        syncTouch: true
    });
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', throttle(target => {
        strokeOffset = 160 - target.progress*160
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
<main>
    <slot />
</main>