const base = require('airtable').base('appiAalgbQrBtqbph');
const goodreads = require('goodreads-api-node');

const gr_credentials = {
    key: process.env.GOODREADS_API_KEY,
    secret: process.env.GOODREADS_API_SECRET
};

const gr = goodreads(gr_credentials);

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