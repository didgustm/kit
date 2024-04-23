<script>
    import { onMount } from 'svelte'
    import '$scss/section/visual.scss'
    import Matter from 'matter-js'
    import Title from './Title.svelte'
    import Scroll from './Scroll.svelte';

    let canvas, particles = [], statics = [], staticsB = [];
    const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Common = Matter.Common,
            Composite = Matter.Composite,
            Constraint = Matter.Constraint,
            Event = Matter.Events;

    const engine = Engine.create(),
    runner = Runner.create(),
    world = engine.world;

    function drawStatic(xpos, ypos, xgap, ygap, row, column, r){
        for(var i = 0; i < row; i++){
            for(var j = 0; j < column; j++){
                let x;
                j % 2 == 0? x = (xgap * i) + xpos: x = (xgap * i) + (xpos+xgap/2);
                let y = (ygap * j) + ypos   
                const _ = Bodies.circle(x, y, r, {
                    label: 'static',
                    isStatic: true,
                    render: {
                        fillStyle: '#C3C6CA'
                    }
                });
                statics.push(_)
            }
        }
    }

    function drawStatic2(xpos, ypos, xgap, ygap, row, column){
        for(var i = 0; i < row; i++){
            for(var j = 0; j < column; j++){
                let x = (xgap * i - (j*xgap/2)) + xpos;
                let y = (ygap * j + (i*4)) + ypos;
                const _ = Bodies.circle(x, y, 3, {
                    label: 'static',
                    isStatic: true,
                    render: {
                        fillStyle: '#C3C6CA'
                    }
                });
                staticsB.push(_)
            }
        }
    }

    function updateParticle(min, max, count){
        for(var i = 0; i < count; i++){
            let x = Common.random(100, innerWidth - 100),
                y = Common.random(-30, 30),
                size = Common.random(min, max);
            const p = Bodies.circle(x, y, size, {
                restitution: 0.2,
                friction: 0.4,
                frictionStatic: 0,
                label: 'particle',
                render: {
                    fillStyle: '#fff'
                }
            });
            particles.push(p)
        }
    }

    onMount(() => {
        let vw = innerWidth, vh = innerHeight;
        let xBasic = innerWidth >= 1600? 1600: innerWidth;
        const render = Render.create({
            element: canvas,
            engine: engine,
            pixelRatio: window.devicePixelRatio,
            options: {
                width: innerWidth >= 1600? 1600: innerWidth,
                height: innerHeight,
                wireframes: false,
                background: '#2C2F32'
            }
        });

        Render.run(render)
        Runner.run(runner, engine);        

        particles.length = 0;
        let particleRadius = innerWidth < 500? [10, 15]: innerWidth < 1000? [12, 17]: [15, 20];
        updateParticle(particleRadius[0], particleRadius[1], 15);
        Composite.add(world, particles);

        let staticCount = Math.round(particleRadius[0] / 2.5)
        drawStatic(xBasic * 0.06, innerHeight*0.55, particleRadius[1]*3, particleRadius[1]*2, staticCount, 5, 2);
        Composite.add(world, statics);


        let staticBCount = Math.round(particleRadius[1] / 2.5)
        drawStatic2(xBasic * 0.53, innerHeight * 0.1, particleRadius[1]*2.3, particleRadius[1]*2, staticBCount, 3, 3);
        Composite.add(world, staticsB);

        let bottom = Bodies.rectangle(innerWidth / 2, innerHeight+10, innerWidth, 20, { 
            isStatic: true,
            label: 'bottom',
            render: {
                fillStyle: '#fff'
            }
        });
        Composite.add(world, bottom);

        let circleA = Bodies.circle(xBasic * 0.2, innerHeight * 0.15, particleRadius[1]*4, {
            render: {
                fillStyle: '#344757'
            }
        }),
        circleA2 = Constraint.create({
            pointA: { x: circleA.position.x, y: circleA.position.y },
            bodyB: circleA,
            pointB: { x:0, y:-35 },
            stiffness: 0.001,
            length: 0,
            render: {
                visible: false
            }
        })
        Composite.add(world, [ circleA, circleA2 ]);

        let rectA = Bodies.rectangle(xBasic / 2, innerHeight * 0.84, 100, particleRadius[1]*2.5, {
            restitution: 2,
            chamfer: {
                radius: 10
            },
            label: 'spring',
            inertia: Infinity,
            render: {
                fillStyle: '#C28423'
            }
        }),
        rectA2 = Constraint.create({
            pointA: { x:rectA.position.x, y:rectA.position.y },
            bodyB: rectA,
            pointB: { x:0, y:0 },
            length: 0,
            stiffness: 0.01,
            damping : 0.2,
            render: {
                visible: false
            }
        })
        Composite.add(world, [ rectA, rectA2 ]);

        let partA = Bodies.rectangle(xBasic * 0.8, innerHeight / 2.2, particleRadius[1] * 10, particleRadius[1] * 10 / 4, { 
            chamfer: {
                radius: 10
            },
            render: {fillStyle: '#344757'
        } }),
        partB = Bodies.rectangle(xBasic * 0.8, innerHeight / 2.2, particleRadius[1] * 10 / 4, particleRadius[1] * 10, { 
            chamfer: {
                radius: 10
            },
            render: {fillStyle:'#344757'} 
        }),
        compound = Matter.Body.create({
            restitution: 0,
            parts: [ partA, partB ],
            inertia: innerWidth * 10
        }),
        comp = Constraint.create({
            pointA: { x: compound.position.x, y: compound.position.y },
            bodyB: compound,
            length: 0,
            //stiffness: 0.01,
            render: {
                visible: false
            }
        });
        Composite.add(world, [ compound, comp ]);

        for(var i = 0; i <= 15; i++){
            let shape = Bodies.polygon(Common.random(100, 1500), Common.random(100, innerHeight - 100), Common.random(3, 8), Common.random(3, 12), {
                isStatic: true,
                isSensor: true,
                restitution: 1,
                friction: 0,
                firctionAir: 0,
                frictionStatic: 0,
                label: 'shapes',
                render: {
                    fillStyle: 'transparent',
                    lineWidth: 1,
                    strokeStyle: '#C3C6CA'
                }
            });
            Composite.add(world, shape)
        }

        Event.on(render, 'afterRender', () => {
            particles.forEach(p => {
                let newRadius = Common.random(particleRadius[0], particleRadius[1]);
                if((Matter.Body.getSpeed(p).toFixed(1) <= 0.05 && p.position.y + p.circleRadius*2 >= innerHeight) || p.position.y > innerHeight){
                    var posx = Common.random(100, xBasic - 100);
                    Matter.Body.setVelocity(p, p.velocity);
                    Matter.Body.setPosition(p, { x: posx, y: -p.circleRadius });
                    //Matter.Body.update(p);
                    p.render.fillStyle = '#fff';
                    Matter.Body.scale(p, newRadius / p.circleRadius, newRadius / p.circleRadius);
                }
            })
        }); 

        Event.on(engine, 'collisionStart', e => {
            let pairs = e.pairs;
            for(var i = 0, j = pairs.length; i != j; ++i){
                let pair = pairs[i];

                if(pair.bodyA.label == 'particle' && pair.bodyB.label != 'shapes'){
                    pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle
                } else if(pair.bodyB.label == 'particle' && pair.bodyA.label != 'shapes'){
                    pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle
                }
            }
        });

        Event.on(engine, 'collisionEnd', e => {
            let pairs = e.pairs;
            for(var i = 0, j = pairs.length; i != j; ++i){
                let pair = pairs[i];

                if(pair.bodyA.label == 'static'){
                    pair.bodyB.render.fillStyle = '#fff'
                } else if(pair.bodyB.label == 'static'){
                    pair.bodyA.render.fillStyle = '#fff'
                }
            }
        })

        Event.on(render, 'afterRender', () => {
            vw = innerWidth;
            vh = innerHeight;
        });

        window.addEventListener('resize', () => {
            xBasic = innerWidth >= 1600? 1600: innerWidth;
            if(innerWidth < 500){
                particleRadius = [10, 15];

                Composite.remove(world, statics);
                Composite.remove(world, staticsB);
                statics.length = 0;
                staticsB.length = 0;
                drawStatic(innerWidth * 0.06, innerHeight*0.55, particleRadius[1]*3, particleRadius[1]*2, 4, 3, 2);
                drawStatic2(innerWidth * 0.53, innerHeight * 0.1, particleRadius[1]*2.3, particleRadius[1]*2, 6, 3, 3)
                Composite.add(world, statics);
                Composite.add(world, staticsB);
            } else if(innerWidth < 1000){
                particleRadius = [12, 17];

                Composite.remove(world, statics);
                Composite.remove(world, staticsB);
                statics.length = 0;
                staticsB.length = 0;
                drawStatic(innerWidth * 0.06, innerHeight*0.55, particleRadius[1]*3, particleRadius[1]*2, 5, 5, 2);
                drawStatic2(innerWidth * 0.53, innerHeight * 0.1, particleRadius[1]*2.3, particleRadius[1]*2, 7, 3, 3)
                Composite.add(world, statics);
                Composite.add(world, staticsB);
            } else{
                particleRadius = [15, 20];

                Composite.remove(world, statics);
                Composite.remove(world, staticsB);
                statics.length = 0;
                staticsB.length = 0;
                drawStatic(xBasic * 0.06, innerHeight*0.55, particleRadius[1]*3, particleRadius[1]*2, 6, 5, 2);
                drawStatic2(xBasic * 0.53, innerHeight * 0.1, particleRadius[1]*2.3, particleRadius[1]*2, 8, 3, 3)
                Composite.add(world, statics);
                Composite.add(world, staticsB);
            }
            
            if(vw != innerWidth){
                render.canvas.width = xBasic;
                render.canvas.height = innerHeight;
                Matter.Body.setPosition(bottom, { x: xBasic / 2, y: innerHeight+10 });
                Matter.Body.scale(bottom, xBasic / vw, 1)
                
                Matter.Body.setPosition(circleA, { x: xBasic * 0.2, y: innerHeight * 0.15 });
                Matter.Body.scale(circleA, (particleRadius[1] * 4) / circleA.circleRadius, (particleRadius[1] * 4) / circleA.circleRadius)
                
                Matter.Body.setPosition(rectA, { x: xBasic / 2, y: innerHeight * 0.84 });

                Matter.Body.setPosition(compound, { x: xBasic * 0.8, y: innerHeight / 2.2 });
                Matter.Body.scale(compound, (particleRadius[1] * 10) / (compound.bounds.max.x - compound.bounds.min.x), (particleRadius[1] * 10) / (compound.bounds.max.x - compound.bounds.min.x))

                Composite.allConstraints(world).forEach(x => {
                    x.pointA = Constraint.pointBWorld(x);
                });
            }
        })
    })
</script>

<section class="visual">
    <div class="canvas" bind:this={canvas}></div>
    <div class="inner">
        <Title />
    </div>
    <Scroll />
    <div class="bg"></div>
</section>