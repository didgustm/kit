<script>
    import '$scss/section/contact.scss'
    import Title from './Title.svelte'
    import List from './List.svelte'
    import Footer from '$comp/common/Footer.svelte';

    export let deg03
</script>

<section class="contact">
    <div class="inner">
        <Title { deg03 } />
        <List />
    </div>
    <Footer />
</section>