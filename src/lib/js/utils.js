import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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
export const indexScroll = () => {
    let pin = gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            scrub: 0,
            end: `${innerHeight * 2}`
        }
    });
    pin.to('.visual .title', { scale:1.2, ease:'none' })
    .to('.visual .title', { scale:1.5, ease:'none' })
    .to('.visual .bg', { opacity:1, scale:5, duration:2, ease:'none' }, '<')
    .to('.visual .bg2', { scale:1 }, '<')
    .to('.visual .bg2', { opacity:1, duration:0.4 }, '-=1');

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            end:`center+=${innerHeight/2.3} center`,
            scrub:0
        }
    });
    tl.to('.about .title p', { opacity:1, rotateY:0, duration:1, delay:1 })
    .to('.about .image', { scale:1, opacity:1 }, '<')
    .to('.about .info p', { opacity:1, y:0 }, '<')
    .to('.career01', { opacity:1, y:0 }, '<')
    .to('.career .line', { scaleY:1 })
    .to('.career02', { opacity:1, y:0 }, '-=0.5')
    .to('.about .box01', { x:0, xPercent:0, opacity:1, scale:1, duration:0.6 })
    .to('.about .box02', { x:0, xPercent:0, y:0, yPercent:0, opacity:1, scale:1, duration:0.6 }, '-=0.3')
    .to('.about .box03', { x:0, xPercent:0, y:0, opacity:1, scale:1, duration:0.6 }, '-=0.3')
    .to('.about .box04', { x:0, opacity:1, scale:1, duration:0.6 }, '-=0.3');

    let tlB = gsap.timeline({
        scrollTrigger: {
            trigger: '.portfolio',
            end:`center center`,
            scrub:0
        }
    });
    tlB.to('.portfolio .title p', { opacity:1, rotateY:0, duration:1, delay:1 })
    .to('.portfolio swiper-slide', { opacity:1, x:0, xPercent:0, duration:2 });

    let tlC = gsap.timeline({
        scrollTrigger: {
            trigger: '.contact',
            end:`center+=${innerHeight/2} bottom+=100`,
            scrub:0
        }
    });
    tlC.to('.contact .title p', { opacity:1, rotateY:0, duration:1, delay:1 })
    .to('.contact .list01', { opacity:1, y:0 })
    .to('.contact .list02', { opacity:1, y:0 })
    .to('.contact .list03', { opacity:1, y:0 })
}