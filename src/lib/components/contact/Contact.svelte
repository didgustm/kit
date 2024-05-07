<script>
    import '$scss/section/contact.scss'
    import { onMount } from 'svelte'
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import lottie from 'lottie-web'
    import animationData from '$js/contact_motion.json'
    import Title from './Title.svelte'
    import List from './List.svelte'
    import Footer from '$comp/common/Footer.svelte';

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    let lottieContainer;
    onMount(() => {
        let motion = lottie.loadAnimation({
            container: lottieContainer,
            animationData,
            autoplay: false,
            loop: true
        })
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact',
                end:`center+=${innerHeight/2} bottom+=150`,
                scrub:0,
                onEnter: () => {
                    motion.play()
                },
                onLeaveBack: () => {
                    motion.stop()
                }
            }
        });
        mm.add('(min-width:768px)', () => {
            tl.fromTo('.contact .title p', { opacity:0, rotateY:40 }, { opacity:1, rotateY:0, duration:2, delay:2 })
            .fromTo('.contact .list01', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
            .fromTo('.contact .list02', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
            .fromTo('.contact .list03', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        });
        mm.add('(max-width:768px)', () => {
            tl.fromTo('.contact .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:2, delay:2 })
            .fromTo('.contact .list01', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
            .fromTo('.contact .list02', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
            .fromTo('.contact .list03', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        });
    })
</script>

<section class="contact">
    <div class="inner">
        <Title />
        <List />
        <div class="lottie" bind:this={lottieContainer}></div>
    </div>
    <Footer />
</section>