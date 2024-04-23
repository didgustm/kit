<script>
    import { fade } from 'svelte/transition'
</script>

<div class="loading" out:fade={{duration:100}}>
    <svg width="80px" height="80px" viewBox="0 0 80 80">
        <path stroke-width="10" stroke-linecap="round" fill="none" d="M40,10 A30,30 0 1,0 70,40"></path>
    </svg>
</div>