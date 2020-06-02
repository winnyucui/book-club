import { get_nomination_data } from './_dal';

export async function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    let nominations_data = await get_nomination_data()
    let contents = Promise.all(nominations_data).then(JSON.stringify)
    res.end(await contents)
}
    