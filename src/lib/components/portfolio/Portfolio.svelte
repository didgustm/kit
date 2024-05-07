<script>
    import '$scss/section/portfolio.scss'
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import Title from './Title.svelte'
    import Background from './Background.svelte'
    import List from './List.svelte';

    export let data;
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    onMount(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.portfolio',
                end:`center center`,
                scrub:0
            }
        });
        mm.add('(min-width:768px)', () => {
            tl.fromTo('.portfolio .title p', { opacity:0, rotateY:40 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .to('.portfolio > .bg', { backgroundPositionY:'100%', duration:1, ease:'none' })
            .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<')
            .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<');
        });
        mm.add('(max-width:768px)', () => {
            tl.fromTo('.portfolio .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .to('.portfolio > .bg', { backgroundPositionY:'100%', duration:1, ease:'none' })
            .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<')
            .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<');
        });
    })
</script>

<section class="portfolio">
    <Background />
    <div class="inner">
        <Title />
        <List { data } />
    </div>
</section>