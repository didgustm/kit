import Matter from 'matter-js';

function Visual(canvas){
    // variable
    let vw = innerWidth >= 1600? 1600: innerWidth;
    let particles = [], statics = [], blocks = [], blocksC = [], letters = document.querySelectorAll('.letter'), resizing = false;
    
    // setup
    this.Engine = Matter.Engine;
    this.Runner = Matter.Runner;
    this.Render = Matter.Render;
    const Bodies = Matter.Bodies,
                Body = Matter.Body,
                Common = Matter.Common,
                Composite = Matter.Composite,
                Constraint = Matter.Constraint,
                Event = Matter.Events;
    this.engine = this.Engine.create(),
    this.runner = this.Runner.create();
    const world = this.engine.world;
    this.render = this.Render.create({
        element: canvas,
        engine: this.engine,
        pixelRatio: window.devicePixelRatio,
        options: {
            width: innerWidth >= 1600? 1600: innerWidth,
            height: innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });
    this.Render.run(this.render);
    this.Runner.run(this.runner, this.engine);
    let group = Body.nextGroup(true)

    // floor
    let floor = Bodies.rectangle(innerWidth / 2, innerHeight+10, innerWidth, 20, {
        isStatic: true,
        label: 'floor',
        render: { fillStyle: '#3d3d3d' }
    });

    // particles
    let radius = innerWidth < 500? [10, 15]: innerWidth < 1000? [12, 17]: [15, 20];
    pushParticle(particles, Bodies, Common, 20, radius);

    // staticA
    drawStaticA(statics, Bodies, innerWidth * 0.06, innerHeight * 0.1, radius[1]*2.5, radius[1]/3.5);
    statics.forEach(x => x.collisionFilter.group = group);

    // circles
    let circleA = Bodies.circle(vw * 0.7, innerHeight * 0.3, radius[1]*4, {
        friction: 1,
        restitution: 0,
        mass: 1280 / vw,
        render: { fillStyle: '#e8d5c6' }
    }),
    circleAC = Constraint.create({
        pointA: Matter.Vector.clone(circleA.position),
        bodyB: circleA,
        stiffness: 0.005,
        render: { visible: false }
    }),
    circleB = Bodies.circle(circleA.position.x + radius[1]*4 + radius[1]*2.2, circleA.position.y + radius[1]*2.2, radius[1]*2.2, {
        friction: 1,
        restitution: 0,
        mass: 1600 / vw,
        render: { fillStyle: '#fff' }
    }),
    circleBC = Constraint.create({
        pointA: Matter.Vector.clone(circleB.position),
        bodyB: circleB,
        stiffness: 0.002,
        render: { visible: false }
    }),
    circleC = Bodies.circle(circleA.position.x + radius[1]*4 - radius[1]*1.5, circleA.position.y + radius[1]*4 + radius[1]*2.2 + radius[1]*1.5, radius[1]*1.5, {
        friction: 1,
        restitution: 0,
        mass: 800 / vw,
        render: { fillStyle: '#e8d5c6' }
    }),
    circleCC = Constraint.create({
        pointA: Matter.Vector.clone(circleC.position),
        bodyB: circleC,
        stiffness: 0.01,
        render: { visible: false }
    });

    // triangle
    let triangle = Bodies.polygon(vw * 0.85, innerHeight * 0.78, 3, radius[1]*6, {
        friction: 1,
        restitution: 0,
        collisionFilter: { group },
        chamfer: { radius:10 },
        render: { fillStyle: '#e8d5c6' }
    }),
    triangleC = Constraint.create({
        pointA: Matter.Vector.clone(triangle.position),
        bodyB: triangle,
        render: { visible: false }
    });

    // cross
    let partA = Bodies.rectangle(vw * 0.23, innerHeight * 0.65, radius[1]*10, radius[1]*10/4, {
        chamfer: { radius: 8 },
        render: { fillStyle: '#e8d5c6' }
    }),
    partB = Bodies.rectangle(vw * 0.23, innerHeight * 0.65, radius[1]*10/4, radius[1]*10, {
        chamfer: { radius: 8 },
        render: { fillStyle: partA.render.fillStyle }
    }),
    compound = Body.create({
        restitution: 0,
        collisionFilter: { group },
        parts: [ partA, partB ],
        inertia: innerWidth * 10
    }),
    comp = Constraint.create({
        pointA: Matter.Vector.clone(compound.position),
        bodyB: compound,
        length: 0,
        render: { visible: false }
    });

    // catapult
    let baseOption = { isStatic: true, mass: 20, label: 'particle', render: { visible: false } }
    let catapult = Bodies.rectangle(innerWidth / 2, innerHeight *0.88, radius[1]*10, 30, {
        restitution: 1,
        collisionFilter: { group },
        chamfer: { radius: 5 },
        render:{ fillStyle: '#fff' }
    }),
    baseA = Bodies.rectangle(catapult.position.x - (radius[1]*10)/2 + radius[1]/0.6, innerHeight - radius[1]/0.6, radius[1]/0.6, 30, baseOption),
    baseB = Bodies.rectangle(catapult.position.x + (radius[1]*10)/2 -  radius[1]/0.6, innerHeight - radius[1]/0.6, radius[1]/0.6, 30, baseOption),
    catapultC = Constraint.create({
        bodyB: catapult,
        pointA: Matter.Vector.clone(catapult.position),
        length: 0,
        render: { visible: false }
    });

    // letter
    setTimeout(() => {
        withLetter(letters, blocks, blocksC, Bodies, Constraint);
        Composite.add(world, [...blocks, ...blocksC]);
    }, 400)
    
    // mouse
    let cursor = Bodies.circle(innerWidth / 2, innerHeight / 2, 7.5, {
        isStatic: true,
        label: 'cursor',
        restitution:1,
        friction: 1,
        frictionStatic: 5,
        collisionFilter: { group },
        render: { fillStyle: '#fff', visible: false }
    }),
    mouse = Matter.Mouse.create(this.render.canvas);
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    this.render.mouse = mouse;

    // add
    Composite.add(world, [floor, ...particles, compound, comp, circleA, circleAC, circleB, circleBC, circleC, circleCC]);
    Composite.add(world, [catapult, catapultC, baseA, baseB]);
    Composite.add(world, statics);
    Composite.add(world, [cursor, triangle, triangleC]);
    // if(!window.matchMedia('(pointer:coarse)').matches){
    //     Composite.add(world, [cursor, triangle, triangleC]);
    // }
    statics.forEach(x => {
        Body.rotate(x, Math.PI / Common.random(-1, 1))
    });

    // Events
    Event.on(this.render, 'afterRender', () => {
        particles.forEach(p => {
            let pos = { x:p.position.x.toFixed(3), y:p.position.y.toFixed(3) },
            posPrev = { x:p.positionPrev.x.toFixed(3), y:p.positionPrev.y.toFixed(3) };
            if((pos.x == posPrev.x && pos.y == posPrev.y) || p.position.y >= innerHeight){
                let set = { x: Common.random(100, innerWidth - 100), y: Common.random(-30, 0), r: Common.random(...radius) }
                Body.setVelocity(p, p.velocity);
                Body.setPosition(p, { x: set.x, y:set.y });
                Body.setMass(p, p.mass);
                Body.scale(p, set.r / p.circleRadius, set.r / p.circleRadius);
                p.render.fillStyle = '#fff'
            }
        });
        if(blocks.length != 0){
            letters.forEach((letter, idx) => {
                let pos = { x: blocks[idx].positionPrev.x - blocks[idx].position.x, y: blocks[idx].positionPrev.y - blocks[idx].position.y }
                letter.style.transform = `translate(${pos.x}px, ${pos.y}px)`
            })
        }
    });
    Event.on(this.engine, 'collisionStart', e => {
        let pairs = e.pairs;
        for(var i = 0, j = pairs.length; i != j; ++i){
            let pair = pairs[i];
            if(pair.bodyA.label == 'particle' && pair.bodyB.label != 'particle'){
                pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle
            } else if(pair.bodyB.label == 'particle' && pair.bodyA.label != 'particle'){
                pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle
            }
        }
    });
    Event.on(this.engine, 'afterUpdate', () => {
        if(!window.matchMedia('(pointer:coarse)').matches){
            Body.translate(cursor, { x: mouse.position.x - cursor.position.x, y: mouse.position.y -cursor.position.y })
        }
    });

    this.resize = () => {
        resizing = true;
        let newVw = innerWidth >= 1600? 1600: innerWidth;
        // if(!window.matchMedia('(pointer:coarse)').matches){
        //     Composite.add(world, cursor);
        // } else{
        //     Composite.remove(world, cursor);
        // }
        
        Event.on(this.render, 'afterRender', () => {
            vw = innerWidth >= 1600? 1600: innerWidth
        });
        this.render.canvas.width = innerWidth >= 1600? 1600: innerWidth;
        this.render.canvas.height = innerHeight;
        Body.setPosition(floor, { x: newVw / 2, y: innerHeight+10 });
        Body.scale(floor, newVw / vw, 1);     
        
        if(innerWidth != vw && resizing){
            radius = innerWidth < 500? [10, 15]: innerWidth < 1000? [12, 17]: [15, 20];

            Body.setPosition(circleA, { x: newVw * 0.7, y: innerHeight * 0.3 });
            Body.setPosition(circleB, { x: circleA.position.x + radius[1]*4 + radius[1]*2.2, y: circleA.position.y + radius[1]*2.2 });
            Body.setPosition(circleC, { x: circleA.position.x + radius[1]*4 - radius[1]*1.5, y: circleA.position.y + radius[1]*4 + radius[1]*2.2 + radius[1]*1.5 });
            Body.setMass(circleA, 1280 / newVw);
            Body.setMass(circleB, 1600 / newVw);
            Body.setMass(circleB, 800 / newVw);
            Body.scale(circleA, (radius[1] * 4) / circleA.circleRadius, (radius[1] * 4) / circleA.circleRadius);
            Body.scale(circleB, (radius[1] * 2.2) / circleB.circleRadius, (radius[1] * 2.2) / circleB.circleRadius);
            Body.scale(circleC, (radius[1] * 1.5) / circleC.circleRadius, (radius[1] * 1.5) / circleC.circleRadius);

            Body.setPosition(triangle, { x: 1600*0.85, y: innerHeight * 0.78 })

            Body.setPosition(catapult, { x: newVw / 2, y: innerHeight *0.88 });
            Body.setAngle(catapult, Math.PI);
            Body.scale(catapult, (radius[1]*10) / (catapult.bounds.max.x - catapult.bounds.min.x), 1);
            Body.setPosition(baseA, { x:catapult.position.x - (radius[1]*10)/2 + radius[1]/0.6, y:innerHeight - radius[1]/0.6 });
            Body.setPosition(baseB, { x:catapult.position.x + (radius[1]*10)/2 - radius[1]/0.6, y:innerHeight - radius[1]/0.6 });

            Body.setPosition(compound, { x: newVw * 0.23, y: innerHeight * 0.65 });
            Body.scale(compound, (radius[1] * 10) / (compound.bounds.max.x - compound.bounds.min.x), (radius[1] * 10) / (compound.bounds.max.x - compound.bounds.min.x));
            Body.setInertia(compound, innerWidth*10);

            Composite.remove(world, statics);
            statics.length = 0;
            drawStaticA(statics, Bodies, innerWidth * 0.06, innerHeight * 0.1, radius[1]*2.5, radius[1]/3.5);
            Composite.add(world, statics);
            if(resizing){
                setTimeout(() => {
                    Composite.remove(world, [...blocks, ...blocksC]);
                    // blocks.length = 0;
                    // blocksC.length = 0;
                    // withLetter(letters, blocks, blocksC, Bodies, Constraint);
                    Composite.add(world, [...blocks, ...blocksC]);
                    resizing = !resizing
                }, 400);
            }
            statics.forEach(x => {
                Body.rotate(x, Math.PI / Common.random(-1, 1))
            });

            Composite.allConstraints(world).forEach(x => {
                x.pointA = Constraint.pointBWorld(x);
            });
        }
    }

    // resize
    window.addEventListener('resize', () => this.resize());
}

function pushParticle(array, body, common, count, radius){
    for(var i = 0; i <= count; i++){
        let set = {
            x: common.random(100, innerWidth - 100),
            y: common.random(-30, 0),
            r: common.random(...radius)
        }
        array.push(
            body.circle(set.x, set.y, set.r, {
                restitution: 0.4,
                friction: 0.05,
                frictionStatic: 0.1,
                frictionAir: 0.01,
                label: 'particle',
                render: { fillStyle: '#fff' }
            })
        )
    }
}

function drawStaticA(array, body, xpos, ypos, gap, row){
    for(var i = 0; i < row; i++){
        for(var j = 0; j < row-1; j++){
            let pos = {
                x: j % 2 == 0? (gap * i) + xpos: (gap * i) + (xpos+gap/2),
                y: (gap-10) * j + ypos
            }
            let bg = ['#e8d5c6', '#fff'];
            array.push(
                body.rectangle(pos.x, pos.y, 6, 6, {
                    label: 'static',
                    isStatic: true,
                    friction: 0,
                    restitution: 0,
                    render: { fillStyle: bg[Math.floor(Math.random() * 2)] }
                })
            );
        }
    }
}

function withLetter(letters, array1, array2, body, constraint){
    letters.forEach((letter, idx) => {
        let letterSet = letter.getBoundingClientRect();
        let gap = innerWidth > 1600? ((innerWidth - 1600) / 2): 0;
        let b = body.rectangle(
            letterSet.left + (letterSet.width/2) - gap,
            letterSet.top + letterSet.height/2,
            letterSet.width,
            letterSet.height / 1.7,
            {
                inertia: Infinity,
                restitution: 0.8,
                friction: 0,
                chamfer: { radius: idx == 0? 20: idx == 1? [0, 30, 30, 0]: letterSet.width / 2 },
                render: { fillStyle: '#e8d5c6', visible: false }
            }
        );
        let bc = constraint.create({
            pointA: Matter.Vector.clone(b.position),
            bodyB: b,
            stiffness: 0.03,
            damping: 0.1,
            length: 0,
            render: { visible: false }
        })
        array1.push(b);
        array2.push(bc)
    });
}

export { Visual } 