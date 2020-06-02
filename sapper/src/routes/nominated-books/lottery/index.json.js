import { get_club_data, get_nomination_data } from './_dal';

// input: array of nominated books
async function initialize_lottery(nominated_books, number_of_slots) {
    let sequence = [...Array(nominated_books.length).keys()]
    
    let active_books = []
    while (active_books.length < number_of_slots) {
        let r = Math.floor(Math.random() * sequence.length)
        active_books.push(sequence[r])
        sequence.splice(r,1)   
    }
    return active_books
}


export async function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    // club_details
    // book_details
    


    let club_data = await get_club_data()
    let nomination_data = await get_nomination_data()
    console.log("NOMINATION", nomination_data)
    let container = {};
    let contents = await Promise.all(nomination_data)
    .then((data) => {container.nomination_data = data})
    .then(get_club_data)
    .then((club_data) => {
        container.club_data = club_data
        return container
    })
    .then((container)=>{
        return JSON.stringify(container)
    })

    let lot = await initialize_lottery(nomination_data, 5)
    console.log("HUHUHUH", lot)


    res.end(await contents)
}
