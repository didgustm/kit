// routes > list > page
export async function load({ params }){
    const detail = await import(`../${params.slug}.md`);
    const { id, title, caption, url, view, role, device } = detail.metadata
    return { id, title, caption, url, view, role, device }
}