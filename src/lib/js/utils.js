import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Lenis from '@studio-freight/lenis';

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
export function SmoothScroll(){
    this.lenis = new Lenis({
        syncTouch: true,
        easing: 'none'
    });
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0);
}

export function Scrollvalue(){
    this.h = document.querySelector('.pin').getBoundingClientRect().height;
    // window.addEventListener('resize', () => {
    //     this.h = document.querySelector('.pin').getBoundingClientRect().height;
    // })
    this.tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.pin',
            scrub: 1,
            pin: '.visual',
            markers: true,
            pinSpacing: false,
            end: `+=${this.h} ${innerHeight}`,
            onUpdate: ({progress}) => {
                innerWidth > 500? this.strokeOffset = 160 - progress*160: this.strokeOffset = 130 - progress*130
            }
        }
    });
}


// export const scrollMotion = () => {
//     let deg, deg02, deg03, strokeOffset;
//     let h = document.querySelector('.pin').getBoundingClientRect().height;  
//     window.addEventListener('resize', () => {
//         h = document.querySelector('.pin').offsetHeight;
//     })
//     let scr = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.pin',
//             scrub: 1,
//             pin: '.visual',
//             pinSpacing: false,
//             //markers: true,
//             //start: 'top top',
//             end: `+=${h} ${innerHeight}`,
//             onUpdate: (target) => {
//                 innerWidth > 500? strokeOffset = 160 - target.progress*160: strokeOffset = 130 - target.progress*130;
//                 if(target.progress >= 0.42){
//                     deg = 1
//                 } else if(target.progress > 0.27){
//                     deg = target.progress * 2.38
//                 }
//                 if(target.progress >= 0.7){
//                     deg02 = 1
//                 } else if(target.progress > 0.55){
//                     deg02 = target.progress * 1.42
//                 }
//                 if(target.progress > 0.8){
//                     deg03 = target.progress;
//                 }
//                 //console.log(target.progress)
//             }
//         }
//     });

//     return deg, deg02, deg03, strokeOffset, scr;
// }