<script>
    import Fa from 'svelte-fa'
    import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="scroll">
    <p>Scroll Down</p>
    <svelte:component this={ Fa } icon={ faChevronDown } size="sm" />
</div>