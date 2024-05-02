<script>
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import Visual from '$comp/visual/Visual.svelte'
    import About from '$comp/about/About.svelte'
    import Portfolio from '$comp/portfolio/Portfolio.svelte'
    import Contact from '$comp/contact/Contact.svelte';

    export let data;
    let w = innerWidth;
    gsap.registerPlugin(ScrollTrigger);
</script>

<svelte:window 
    bind:innerWidth={ w }
/>
<Visual { gsap } />
<About { gsap } { ScrollTrigger } />
<Portfolio { data } { gsap } { ScrollTrigger } />
<Contact { gsap } { ScrollTrigger } />
