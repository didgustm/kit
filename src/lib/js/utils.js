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