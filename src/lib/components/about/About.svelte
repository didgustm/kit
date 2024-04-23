<script>
    import '$scss/section/about.scss'
    import Title from './Title.svelte'
    import Info from './Info.svelte'
    import Career from './Career.svelte'
    import Skills from './Skills.svelte';

    export let deg;
</script>

<section class="about aos">
    <div class="inner">
        <Title { deg } />
        <div class="introduce">
            <Info />
            <Career />
        </div>
        <Skills />
    </div>
</section>