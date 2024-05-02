<script>
    import Fa from 'svelte-fa'
    import { faPenToSquare, faKeyboard, faPalette, faChartSimple } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="skills">
    <div class="bgs">
        <div class="bg"></div>
        <div class="bg dark"></div>
        <div class="bg dark"></div>
        <div class="bg"></div>
    </div>
    <ul>
        <li class="box box01">
            <dl>
                <dt>Tools</dt>
                <dd>
                    <p>- VSCode</p>
                    <p>- Github</p>
                    <p>- Photoshop</p>
                    <p>- XD</p>
                    <p>- Figma</p>
                </dd>
            </dl>
            <div class="icon">
                <span class="dot"></span>
                <svelte:component this={ Fa } icon={ faPenToSquare } size="2.5x" />
            </div>
        </li>
        <li class="box box02 dark">
            <dl>
                <dt>Markup</dt>
                <dd>
                    <p>- HTML</p>
                    <p>- php</p>
                    <p>- Asp</p>
                    <p>- SVG</p>
                </dd>
            </dl>
            <div class="icon">
                <span class="dot"></span>
                <svelte:component this={ Fa } icon={ faKeyboard } size="2.5x" />
            </div>
        </li>
        <li class="box box03 dark">
            <dl>
                <dt>Styles</dt>
                <dd>
                    <p>- CSS</p>
                    <p>- CSS Module</p>
                    <p>- SCSS/SASS</p>
                    <p>- CSS in js</p>
                </dd>
            </dl>
            <div class="icon">
                <span class="dot"></span>
                <svelte:component this={ Fa } icon={ faPalette } size="2.5x" />
            </div>
        </li>
        <li class="box box04">
            <dl>
                <dt>Scripts</dt>
                <dd>
                    <p>- Javscript</p>
                    <p>- ES6 Module</p>
                    <p>- jQuery</p>
                    <p>- Canvas</p>
                    <p>- Svelte</p>
                </dd>
            </dl>
            <div class="icon">
                <span class="dot"></span>
                <svelte:component this={ Fa } icon={ faChartSimple } size="2.5x" />
            </div>
        </li>
    </ul>
</div>