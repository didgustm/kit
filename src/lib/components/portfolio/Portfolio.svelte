<script>
    import '$scss/section/portfolio.scss'
    import Title from './Title.svelte'
    import List from './List.svelte';

    export let data;
</script>

<section class="portfolio">
    <div class="bg"></div>
    <div class="inner">
        <Title />
        <List { data } />
    </div>
</section>