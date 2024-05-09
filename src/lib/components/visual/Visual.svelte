<script>
    import '$scss/section/visual.scss'
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { Visual } from '$js/visual'
    import Title from './Title.svelte'
    import Banners from './Banners.svelte'
    import Scroll from './Scroll.svelte';

    gsap.registerPlugin(ScrollTrigger);
    //let mm = gsap.matchMedia();
    let canvas;
    onMount(() => {
        let ctx = gsap.context(() => {
            let matter = new Visual(canvas);
            let pin = gsap.timeline({
                scrollTrigger: {
                    trigger: '.visual',
                    pin: true,
                    anticipatePin: 1,
                    fastScrollEnd: true,
                    scrub: 0,
                    end: `${innerHeight * 2}`,
                    onUpdate: ({progress}) => {
                        document.querySelector('.visual .bg2').style.setProperty('--progress', progress)
                    },
                    onLeave: () => {
                        matter.Render.stop(matter.render);
                        matter.Runner.stop(matter.runner)
                    },
                    onEnterBack: () => {
                        matter.Render.run(matter.render);
                        matter.Runner.run(matter.runner, matter.engine);
                    }
                }
            });
            pin.to('.visual .title', { scale:1.2, ease:'none' })
            .to('.visual .title', { scale:1.5, ease:'none' })
            .fromTo('.visual .bg', { scale:0 }, { scale:5, duration:2, ease:'none' }, '<')
            .fromTo('.visual .bg2', { scale:0, opacity:0 }, { scale:1 }, '<')
            .to('.visual .bg2', { opacity:1, duration:0.4 }, '-=1')
            .to('.visual .banner', { x:0, y:0, xPercent:0, opacity:1, duration:1, ease:'none' }, '-=0.5')
            .fromTo('.visual .banner .in', { opacity:0 }, { opacity:1 });
        });
        return () => ctx.revert();
    })
</script>

<section class="visual">
    <div class="space">
        <div class="top"></div>
        <!-- <div class="bottom"></div> -->
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <div class="canvas" bind:this={canvas}></div>
    <div class="inner">
        <Title />
    </div>
    <Scroll />
    <div class="bg"></div>
    <div class="bg2">
        <Banners />
    </div>
</section>