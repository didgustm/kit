<script>
    import { onMount } from 'svelte'
    import { visualScroll, aboutScroll, portScroll, contactScroll } from '$js/utils'
    import Visual from '$comp/visual/Visual.svelte'
    import About from '$comp/about/About.svelte'
    import Portfolio from '$comp/portfolio/Portfolio.svelte'
    import Contact from '$comp/contact/Contact.svelte';

    export let data;
    onMount(() => {
        visualScroll();
        portScroll();
        aboutScroll();
        contactScroll();
    })
</script>

<Visual />
<About />
<Portfolio { data } />
<Contact />
