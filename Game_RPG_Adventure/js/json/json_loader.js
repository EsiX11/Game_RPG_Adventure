async function load_json(url) {
    const response = await fetch(url);

    return response.json();
}