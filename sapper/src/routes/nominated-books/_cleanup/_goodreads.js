const goodreads = require('goodreads-api-node');

export default async function get_book_images(title, author) {
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
