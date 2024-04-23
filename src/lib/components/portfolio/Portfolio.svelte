<script>
    import '$scss/section/portfolio.scss'
    import Title from './Title.svelte'
    import List from './List.svelte';

    export let data, deg02;
</script>

<section class="portfolio">
    <div class="inner">
        <Title { deg02 } />
        <List { data } />
    </div>
</section>