<script>
    export let data
</script>

<div class="top">
    <p class="descript">{ data.caption }</p>
    <h2 class="title">
        <div>
            <p>{ data.title }</p>
        </div>
    </h2>
    <a href="{ data.url }" class="url" target="_blank">{ data.url }</a>
    <div class="category">
        <p>{ data.role }</p>
        <span>&#8901;</span>
        <p>{ data.device }</p>
    </div>
</div>