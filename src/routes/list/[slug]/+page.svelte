<script>
    import '$scss/section/detail.scss'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { views } from '$js/view'
    import Fa from 'svelte-fa'
    import { faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons'
    import Top from '$comp/detail/Top.svelte'
    import View from '$comp/detail/View.svelte'
    import Loading from '$comp/detail/Loading.svelte';

    export let data;

    let detail, loading = false, scrollY = 0;
    const arr = [...views].reverse(),
                src = arr[data.id - 1];

    const goTop = () => {
        window.scrollTo(0, {behavior: 'smooth'})
    }

    const goBack = () => {
        window.history.back()
    }

    onMount(() => {
        const viewImg = new Image();
        viewImg.src = src;
        loading = true;

        viewImg.onload = () => {
            setTimeout(() => {
                loading = false
            }, 1000)
        }
    })
    
</script>

<svelte:window
    bind:scrollY={scrollY}
/>
<section class="detail" data-lenis-prevent bind:this={detail}>
    <button class="buttons close" on:click={goBack}>
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