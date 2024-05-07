<script>
    import '$scss/section/about.scss'
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import Cube from './Cube.svelte'
    import Title from './Title.svelte'
    import Info from './Info.svelte'
    import Career from './Career.svelte'
    import Skills from './Skills.svelte';

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    onMount(() => {
        let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about',
                end:`center+=${innerHeight/2.3} center`,
                scrub:0
            }
        });
        mm.add('(min-width:768px)', () => {
            tl.fromTo('.about .title p', { opacity:0, rotateY:40, letterSpacing:1.5 }, { opacity:1, rotateY:0, duration:1, delay:1 })
                .fromTo('.about .shapes', { opacity:0 }, { opacity:1 }, '<')
                .fromTo('.about .image', { scale:0, opacity:0 }, { scale:1, opacity:1 }, '<')
                .fromTo('.about .info p', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 }, '<')
                .fromTo('.career01', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '<')
                .fromTo('.career .line', { scaleY:0 }, { scaleY:1 })
                .fromTo('.career02', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '-=0.5')
                .fromTo('.about .box01', { xPercent:-50, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '<')
                .fromTo('.about .box02', { xPercent:-50, yPercent:-25, scale:1.5, opacity:0 }, { xPercent:0, yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
                .fromTo('.about .box03', { xPercent:50, yPercent:25, scale:1.5, opacity:0 }, { xPercent:0, yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
                .fromTo('.about .box04', { xPercent:50, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
                .to('.about .bgs .bg', { opacity:1, scale:1, duration:1 }, '-=1')
                .to('.about .bgs .bg', { opacity:0 })
        });
        mm.add('(max-width:768px)', () => {
            tl.fromTo('.about .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:1, delay:1 })
                .fromTo('.about .shapes', { opacity:0 }, { opacity:1 }, '<')
                .fromTo('.about .image', { scale:0, opacity:0 }, { scale:1, opacity:1 }, '<')
                .fromTo('.about .info p', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 }, '<')
                .fromTo('.career01', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '<')
                .fromTo('.career .line', { scaleY:0 }, { scaleY:1 }, '-=0.5')
                .fromTo('.career02', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '-=0.5')
                .fromTo('.about .box01', { xPercent:-25, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '<')
                .fromTo('.about .box02', { yPercent:-50, scale:1.5, opacity:0 }, { yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
                .fromTo('.about .box03', { yPercent:50, scale:1.5, opacity:0 }, { yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
                .fromTo('.about .box04', { xPercent:25, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
                .to('.about .bgs .bg', { opacity:1, scale:1, duration:1 }, '-=1')
                .to('.about .bgs .bg', { opacity:0 })
        })
    })
</script>

<section class="about">
    <div class="inner">
        <Cube />
        <Title />
        <div class="introduce">
            <Info />
            <Career />
        </div>
        <Skills />
    </div>
    <!-- <div class="wave wave01"></div>
    <div class="wave wave02"></div> -->
</section>