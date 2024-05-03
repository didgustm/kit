<script>
    import '$scss/section/about.scss'
    import Title from './Title.svelte'
    import Info from './Info.svelte'
    import Career from './Career.svelte'
    import Skills from './Skills.svelte';
</script>

<section class="about">
    <div class="inner">
        <Title />
        <div class="introduce">
            <Info />
            <Career />
        </div>
        <Skills />
    </div>
    <!-- <div class="wave wave01"></div>
    <div class="wave wave02"></div> -->
</section>