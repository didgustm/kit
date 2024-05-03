<script>
    import '$scss/section/visual.scss'
    import Title from './Title.svelte'
    import Banners from './Banners.svelte'
    import Scroll from './Scroll.svelte';
</script>

<section class="visual">
    <div class="canvas"></div>
    <div class="inner">
        <Title />
    </div>
    <Scroll />
    <div class="bg"></div>
    <div class="bg2">
        <Banners />
    </div>
</section>