<script>
    export let data
</script>

<div class="top">
    <p class="descript fadeup">{ data.caption }</p>
    <h2 class="title">
        <div>
            <p class="fadeup">{ data.title }</p>
        </div>
    </h2>
    <a href="{ data.url }" class="url fadeup" target="_blank">{ data.url }</a>
    <div class="category fadeup">
        <p>{ data.role }</p>
        <span>&#8901;</span>
        <p>{ data.device }</p>
    </div>
</div>