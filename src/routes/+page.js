export const load = async ({ fetch }) => {
    const response = await fetch(`api`)
    const lists = await response.json();

    return { lists }
}