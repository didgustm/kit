<script>
    import { onMount } from 'svelte'
    import { Scrollvalue, SmoothScroll, throttle } from '$js/utils'
    import Quick from '$comp/quick/Quick.svelte'
    import Visual from '$comp/visual/Visual.svelte'
    import About from '$comp/about/About.svelte'
    import Portfolio from '$comp/portfolio/Portfolio.svelte'
    import Contact from '$comp/contact/Contact.svelte';

    export let data

    let w, deg, deg02, deg03, strokeOffset;
    
    let scr = new SmoothScroll();
    scr.lenis.on('scroll', throttle(target => {
        innerWidth > 500? strokeOffset = 160 - target.progress*160: strokeOffset = 130 - target.progress*130;
        if(target.progress >= 0.42){
            deg = 1
        } else if(target.progress > 0.27){
            deg = target.progress * 2.38
        }

        if(target.progress >= 0.7){
            deg02 = 1
        } else if(target.progress > 0.5){
            deg02 = target.progress * 1.42
        }

        if(target.progress > 0.8){
            deg03 = target.progress;
        }
        console.log(target.progress)
    }, 30));
    onMount(() => {
        let pin = new Scrollvalue();

        // scr.to('.visual .title', { scale:1.2, duration:3, ease:'none' })
        // .to('.visual .title', { scale:1.5, duration:3, ease:'none' })
        // .to('.visual .bg', { opacity:1, scale:5, duration:2, ease:'none',
        //     // onComplete: () => {
        //     //     document.querySelector('.pin-spacer').style.zIndex = 1
        //     // },
        //     // onReverseComplete: () => {
        //     //     document.querySelector('.pin-spacer').style.zIndex = 2
        //     // }
        // }, '<')
        // .to('.about .title p', { opacity:1 }, '>' )
        // .to('.about .image', { scale:1, opacity:1 })
        // .to('.about .info p', { y:0, opacity:1 }, '<')
        // .to('.career01', { y:0, opacity:1 }, '<')
        // .to('.career .line', { scaleY:1 })
        // .to('.career02', { y:0, opacity:1 }, '<')
        // .to('.skills .box01', { scale:1, x:0, xPercent:0, y:0, yPercent:0, opacity:1, duration:2 }, '<')
        // .to('.skills .box02', { scale:1, x:0, xPercent:0, y:0, yPercent:0, opacity:1, duration:2, delay:0.2 }, '<')
        // .to('.skills .box03', { scale:1, x:0, xPercent:0, y:0, yPercent:0, opacity:1, duration:2, delay:0.4 }, '<')
        // .to('.skills .box04', { scale:1, x:0, xPercent:0, y:0, yPercent:0, opacity:1, duration:2, delay:0.6 }, '<')
        // .to('.portfolio .title p', { opacity:1 } )
        // .to('.portfolio .grid', { opacity:1, y:0, duration:2 })
        // .to('.contact .title p', { opacity:1 })
        // .to('.contact .list01', { y:0, opacity:1, duration:3 }, '+=1')
        // .to('.contact .list02', { y:0, opacity:1, duration:3, delay:0.5 }, '<')
        // .to('.contact .list03', { y:0, opacity:1, duration:3, delay:1 }, '<')
        // .to('.visual .bg', { opacity:0 })
    })
</script>

<svelte:window 
    bind:innerWidth={w}
/>
<Quick { w } { strokeOffset } />
<div class="pin">
    <Visual />
    <About { deg } />
    <Portfolio { data } { deg02 } />
    <Contact { deg03 } />
</div>
