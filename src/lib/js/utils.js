import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Visual } from './visual';

export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/src/routes/list/*.md'),
                iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver();
            const postPath = path.slice(11, -3);
            return {
                meta: metadata,
                path: postPath
            }
        })
    )

    return allPosts
}

export const throttle = (callback, delay) => {
    let timer;
    return function(){
        if(!timer){
            timer = setTimeout(_ => {
                callback.apply(this, arguments);
                timer = undefined
            }, delay)
        }
    }
}

gsap.registerPlugin(ScrollTrigger);
export const visualScroll = () => {
    let canvas = document.querySelector('.canvas');
    let matter = new Visual(canvas)
    let pin = gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            scrub: 0,
            end: `${innerHeight * 2}`,
            onUpdate: ({progress}) => {
                document.querySelector('.visual .bg2').style.setProperty('--progress', progress)
                console.log(progress)
            },
            onLeave: () => {
                matter.Render.stop(matter.render);
                matter.Runner.stop(matter.runner)
            },
            onEnterBack: () => {
                matter.Render.run(matter.render);
                matter.Runner.run(matter.runner, matter.engine);
            }
        }
    });
    pin.to('.visual .title', { scale:1.2, ease:'none' })
    .to('.visual .title', { scale:1.5, ease:'none' })
    .fromTo('.visual .bg', { scale:0 }, { scale:5, duration:2, ease:'none' }, '<')
    .fromTo('.visual .bg2', { scale:0, opacity:0 }, { scale:1 }, '<')
    .to('.visual .bg2', { opacity:1, duration:0.4 }, '-=1')
    .to('.visual .banner', {  x:0, y:0, opacity:1, duration:1, ease:'none' }, '-=0.5')
    .fromTo('.visual .banner .in', { opacity:0 }, { opacity:1 })
}
let mm = gsap.matchMedia();
export const aboutScroll = () => {
    let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about',
            end:`center+=${innerHeight/2.3} center`,
            scrub:0
        }
    });
    mm.add('(min-width:768px)', () => {
        tl.fromTo('.about .title p', { opacity:0, rotateY:40 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .fromTo('.about .image', { scale:0, opacity:0 }, { scale:1, opacity:1 }, '<')
            .to('.info .shape', { scale:13, duration:1, ease:'none', 
                onComplete: () => { gsap.to('.info .shape', { rotate:360, duration:13, ease:'none', repeat:-1, yoyo:true }) }
            }, '<')
            .fromTo('.about .info p', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 }, '<')
            .fromTo('.career01', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '<')
            .fromTo('.career .line', { scaleY:0 }, { scaleY:1 })
            .fromTo('.career02', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '-=0.5')
            .fromTo('.about .box01', { xPercent:-50, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '<')
            .fromTo('.about .box02', { xPercent:-50, yPercent:-25, scale:1.5, opacity:0 }, { xPercent:0, yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
            .fromTo('.about .box03', { xPercent:50, yPercent:25, scale:1.5, opacity:0 }, { xPercent:0, yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
            .fromTo('.about .box04', { xPercent:50, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
            .to('.about .bgs .bg', { opacity:1, scale:1, duration:1 }, '-=1')
            .to('.about .bgs .bg', { opacity:0 })
    });
    mm.add('(max-width:768px)', () => {
        tl.fromTo('.about .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:1, delay:1 })
            .fromTo('.about .image', { scale:0, opacity:0 }, { scale:1, opacity:1 }, '<')
            .to('.info .shape', { scale:13, duration:1, ease:'none', 
                onComplete: () => { gsap.to('.info .shape', { rotate:360, duration:13, ease:'none', repeat:-1, yoyo:true }) }
            }, '<')
            .fromTo('.about .info p', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 }, '<')
            .fromTo('.career01', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '<')
            .fromTo('.career .line', { scaleY:0 }, { scaleY:1 }, '-=0.5')
            .fromTo('.career02', { opacity:0, y:`10rem` }, { opacity:1, y:0 }, '-=0.5')
            .fromTo('.about .box01', { xPercent:-25, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '<')
            .fromTo('.about .box02', { yPercent:-50, scale:1.5, opacity:0 }, { yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
            .fromTo('.about .box03', { yPercent:50, scale:1.5, opacity:0 }, { yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
            .fromTo('.about .box04', { xPercent:25, scale:1.25, opacity:0 }, { xPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.4')
            .to('.about .bgs .bg', { opacity:1, scale:1, duration:1 }, '-=1')
            .to('.about .bgs .bg', { opacity:0 })
    })
}

export const portScroll = () => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.portfolio',
            end:`center center`,
            scrub:0
        }
    });
    mm.add('(min-width:768px)', () => {
        tl.fromTo('.portfolio .title p', { opacity:0, rotateY:40 }, { opacity:1, rotateY:0, duration:1, delay:1 })
        .to('.portfolio > .bg', { backgroundPositionY:'100%', duration:1, ease:'none' })
        .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<')
        .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<');
    });
    mm.add('(max-width:768px)', () => {
        tl.fromTo('.portfolio .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:1, delay:1 })
        .to('.portfolio > .bg', { backgroundPositionY:'100%', duration:1, ease:'none' })
        .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<')
        .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:2 }, '<');
    });
}

export const contactScroll = () => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.contact',
            end:`center+=${innerHeight/2} bottom+=150`,
            scrub:1
        }
    });
    mm.add('(min-width:768px)', () => {
        tl.fromTo('.contact .title p', { opacity:0, rotateY:40 }, { opacity:1, rotateY:0, duration:2, delay:2 })
        .fromTo('.contact .list01', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        .fromTo('.contact .list01 .line', { scaleX:0 }, { scaleX:1, duration:1, ease:'none' })
        .fromTo('.contact .list02', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        .fromTo('.contact .list02 .line', { scaleX:0 }, { scaleX:1, duration:1, ease:'none' })
        .fromTo('.contact .list03', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        .fromTo('.contact .list03 .line', { scaleX:0 }, { scaleX:1, duration:1, ease:'none' });
    });
    mm.add('(max-width:768px)', () => {
        tl.fromTo('.contact .title p', { opacity:0, rotateY:60 }, { opacity:1, rotateY:0, duration:2, delay:2 })
        .fromTo('.contact .list01', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        
        .fromTo('.contact .list02', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        
        .fromTo('.contact .list03', { opacity:0, yPercent:100, scale:2 }, { opacity:1, yPercent:0, scale:1, duration:2, ease:'none' })
        
    });
}

export const detailScroll = () => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger:'.detail'
        }
    });
    tl.fromTo('.fadeup', { yPercent:100, opacity:0 }, { yPercent:0, opacity:1, duration:1, delay:1 })
    .fromTo('.view_img', { opacity:0 }, { opacity:1, duration:1, ease:'none' }, '<')
}