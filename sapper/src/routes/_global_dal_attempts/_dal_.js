const base = require('airtable').base('appiAalgbQrBtqbph');
const goodreads = require('goodreads-api-node');

const gr_credentials = {
    key: process.env.GOODREADS_API_KEY,
    secret: process.env.GOODREADS_API_SECRET
};

const gr = goodreads(gr_credentials);

// there should be one function per database table
// reduce the number of api calls to a remote db, which is expensive
// there should be a prepare function for each route.
// there should be a controller, which calls the right prepare function

// NOMINATIONS TABLE METHODS

// example
// table_name, route_name
// get_table_data(nominations, /nominated_books)
    // if table_name == nominations, get_nominations_data(/nominated_books)

// route_name
// get_nominations_data(/nominated_books)
    // if route_name == /nominated_books, IMPLEMENT LOGIC HERE
            
// get_route_data(src_db_name, src_table_name, des_route_name)
// get_route_data("airtable", "nominations", "/nominated-books")

// service = API/DB/...
// remote: true/false
// service_name:
// table_name:
// {"service_name" "remote"}
// {"service_name": "airtable, "table_name": ""}


export async function get_nomination_data() {
    const book_records = await base('nominations').select({
        filterByFormula: "NOT({uid} = '')",
        fields: ["uid", "title", "author", "nominator", "comments"],
        view: "Grid view"
    }).all()

    let nominated_books = await prepare_nomination_data(book_records)
    return nominated_books
}

async function prepare_nomination_data(book_records) {
    let nominated_books = []
    await book_records.forEach((book_record) => {
        let book_details = {
            "title": book_record.get("title"),
            "author": book_record.get("author"),
            "nominator": book_record.get("nominator"),
            "comments": book_record.get("comments"),
        }

        let merged_details = get_book_media(book_details).then((b_m) => {
            let merge = {
                ...book_details,
                ...b_m,
            };
            return merge
        })

        nominated_books.push(merged_details)
    })
    return nominated_books
}

// book_details is an object
async function get_book_media(book_details) {
    const res = await gr.searchBooks({q: book_details.title, page: 1, field: 'title'});
    
    let check = res.search.results.work
    let book_id;
    let show_book;
    let book_image;
    let book_media;
    let book_link;
    try{
        if (check !== undefined) {
            book_id = check[0].best_book.id._
            show_book = await gr.showBook(book_id)
            book_image = check[0].best_book.image_url
            book_link = show_book.book.url
            book_media = {
                "gr_id": book_id,
                "image": book_image,
                "link": book_link
            }
        }
    } catch(err) {
        console.error(err)
    }
    return book_media
}

// CLUB TABLE METHODS


var d = new Date("May 12, 2020 22:00:00");
// []: need to figure out user auth, club auth, and cid. tie it together

// int:current_cycle
//      the cycle that the book-club is on
// return: object
export async function get_club_data(current_cycle) {
    console.log("25")
    // []: use cid to get cycle information for only 1 (current) book club
    // [] : write query to get the max current_cycle number (which is the most recent/currently active cycle). for now, current_cycle is hardcoded
    const record = await base('clubs').select({
        filterByFormula: "AND(NOT({cid} = ''), ({cid} = '01'), ({current_cycle} = '2'))",
        fields: ["end_date"],
        view: "Grid view"
    }).all()
    
    let end_date = record[0].fields.end_date
    let res = {
        "end_date": end_date
    }
    // console.log("whwhwhw", await stringify_json(res))
    // let c_c_details = JSON.parse(record[0].fields.cycle_details)[curr_cycle].lottery
    
    return res
}

// figure out how to pass data from one route to another route??
// through the cache probs


async function prepare_club_data_response(club_data) {

}