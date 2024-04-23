<script>
    import { fly } from 'svelte/transition'
    
    export let show, w, strokeOffset
</script>

<svg class="line">
    <defs>
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
        </filter>
    </defs>
    {#if w > 500}
    <circle r="25" cx="25" cy="25" fill="none"  stroke-width="3" stroke="#fff" transform="rotate(-90)" class="tail t-large" style:--progress={strokeOffset} />
    {:else}
    <circle r="20" cx="20" cy="20" fill="none"  stroke-width="3" stroke="#fff" transform="rotate(-90)" class="tail t-small" style:--progress={strokeOffset} />
    {/if}
</svg>
<div class="blobs radius">
    <span class="blob blob01 radius"></span>
    {#if show}
    <span class="blob blob02 radius" in:fly={{ x:'100%', y:'20%', delay:100 }} out:fly={{ x:'100%', y:'20%' }}></span>
    <span class="blob blob03 radius" in:fly={{ x:'100%', y:'-20%', delay:200 }} out:fly={{ x:'100%', y:'-20%' }}></span>
    <span class="blob blob04 radius" in:fly={{ x:'50%', y:'-100%', delay:300 }} out:fly={{ x:'50%', y:'-100%' }}></span>
    <span class="blob blob05 radius" in:fly={{ x:'-50%', y:'-100%', delay:400 }} out:fly={{ x:'-50%', y:'-100%' }}></span>
    {/if}
</div>