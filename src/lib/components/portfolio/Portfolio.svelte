<script>
    import '$scss/section/portfolio.scss'
    import { onMount } from 'svelte'
    import Title from './Title.svelte'
    import List from './List.svelte';

    export let data, gsap, ScrollTrigger;
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
            .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:2 })
            .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<');
        });
        mm.add('(max-width:768px)', () => {
            tl.fromTo('.portfolio .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:2 })
            .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<');
        });

        window.addEventListener('resize', ScrollTrigger.update);
    })
</script>

<section class="portfolio">
    <div class="inner">
        <Title />
        <List { data } />
    </div>
</section>