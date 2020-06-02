const base = require('airtable').base('appiAalgbQrBtqbph');
const goodreads = require('goodreads-api-node');

export default async function get_nominated_books() {
    const records = await base('Nominations').select({
        filterByFormula: "NOT({UID} = '')",
        fields: ["UID", "Title", "Author", "Nominator", "Comments"],
        view: "Grid view"
    }).all()

    let nominated_books = []
    records.forEach(async (record) => {
        let nominated_book = get_book_media(record.get("Title"), record.get("Author")).then((resolve) => {
            let book = {
                title: record.get("Title"),
                author: record.get("Author"),
                nominator: record.get("Nominator"),
                comments: record.get("Comments"),
                image: resolve.image,
                link: resolve.link
            }
            // console.log("RSEITRS", book)
            return book
        })
        nominated_books.push(nominated_book)

        // console.log("rstesr", nominated_books)
        // console.log('airsetn', book_media)
        // let book = {
        //     title: record.get("Title"),
        //     author: record.get("Author"),
        //     nominator: record.get("Nominator"),
        //     comments: record.get("Comments"),
        //     image: book_media.image,
        //     link: book_media.link
        // }
        // nominated_books.push(book)
    })
    // console.log("RSIETRSNTIRSET", nominated_books)
    // Promise.all(nominated_books).then((check)=>{
        // console.log("RISETn", check)
    // })
    return nominated_books
}


async function get_book_media(title, author) {
    const gr_credentials = {
        key: process.env.GOODREADS_API_KEY,
        secret: process.env.GOODREADS_API_SECRET
    };

    const gr = goodreads(gr_credentials);
    const res = await gr.searchBooks({q: `${title}`, page: 1, field: 'title'});
    let book_id = res.search.results.work[0].best_book.id._
    const res2 = await gr.showBook(book_id)
    
    let book = {
        id: book_id,
        image: res.search.results.work[0].best_book.image_url,
        link: res2.book.url
    }
    
    return book
}
