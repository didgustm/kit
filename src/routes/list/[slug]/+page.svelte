<script>
    import '$scss/section/detail.scss'
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { views } from '$js/view'
    import Fa from 'svelte-fa'
    import { faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons'
    import Top from '$comp/detail/Top.svelte'
    import View from '$comp/detail/View.svelte'
    import Loading from '$comp/detail/Loading.svelte';

    export let data;
    gsap.registerPlugin(ScrollTrigger);
    let detail, loading = false, scrollY = 0;
    const arr = [...views].reverse(),
                src = arr[data.id - 1];

    const goTop = () => {
        window.scrollTo(0, {behavior: 'smooth'})
    }

    const goback = () => {
        history.back();
    }

    onMount(() => {
        const viewImg = new Image();
        viewImg.src = src;
        loading = true;

        viewImg.onload = () => {
            setTimeout(() => {
                loading = false
            }, 500)
        }
        
        let tl = gsap.timeline({
                scrollTrigger: {
                trigger:'.detail'
            }
        });
        tl.fromTo('.fadeup', { yPercent:100, opacity:0 }, { yPercent:0, opacity:1, duration:1, delay:1 })
        .fromTo('.view_img', { opacity:0 }, { opacity:1, duration:1, ease:'none' }, '<');
    })
    
</script>

<svelte:window
    bind:scrollY={scrollY}
/>
<section 
    class="detail"
    bind:this={detail}
>
    <button class="buttons close" on:click={goback}>
        <svelte:component this={ Fa } icon={ faXmark } size="3x" />
    </button>
    <div class="inner">
        <Top { data } />
    </div>
    <View { data } { src } />
    {#if scrollY > 300}
    <button class="btn_top" in:fade out:fade={{ duration:100 }} on:click={goTop}>
        <svelte:component this={ Fa } icon={ faChevronUp } size="2x" />
    </button>
    {/if}
    {#if loading}
    <Loading />
    {/if}
</section>