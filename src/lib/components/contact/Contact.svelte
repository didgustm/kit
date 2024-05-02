<script>
    import '$scss/section/contact.scss'
    import { onMount } from 'svelte'
    import Title from './Title.svelte'
    import List from './List.svelte'
    import Footer from '$comp/common/Footer.svelte';

    export let gsap, ScrollTrigger;
    let mm = gsap.matchMedia();
    onMount(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact',
                end:`center+=${innerHeight/2} bottom+=100`,
                scrub:0
            }
        });
        mm.add('(min-width:768px)', () => {
            tl.fromTo('.contact .title p', { opacity:0, rotateY:40 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .fromTo('.contact .list01', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 })
            .fromTo('.contact .list02', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 })
            .fromTo('.contact .list03', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 });
        });
        mm.add('(max-width:768px)', () => {
            tl.fromTo('.contact .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .fromTo('.contact .list01', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 })
            .fromTo('.contact .list02', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 })
            .fromTo('.contact .list03', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 });
        });

        window.addEventListener('resize', ScrollTrigger.update);
    })
</script>

<section class="contact">
    <div class="inner">
        <Title />
        <List />
    </div>
    <Footer />
</section>