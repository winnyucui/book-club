// const base = require('airtable').base('appiAalgbQrBtqbph');
// const goodreads = require('goodreads-api-node');

// const gr_credentials = {
//     key: process.env.GOODREADS_API_KEY,
//     secret: process.env.GOODREADS_API_SECRET
// };

// const gr = goodreads(gr_credentials);

// // make airtable request to get date time
// // function that converts datetime string to acceptable json output

// var d = new Date("May 12, 2020 22:00:00");

// // async function get_lottery_data () {}
// //    (airtable_creds, query) => {book_title, book_author, end_time}
// //    (book_titles, book_authors) => {book_images}
// //    json = {end_time:str, images:urls}
// //    return json

// // []: need to figure out user auth, club auth, and cid. tie it together

// // int:current_cycle
// //      the cycle that the book-club is on
// export default async function get_lottery_data(current_cycle) {
//     console.log("25")
//     // []: use cid to get cycle information for only 1 (current) book club
    
    
    
//     const record = await base('clubs').select({
//         filterByFormula: "AND(NOT({cid} = ''), ({cid} = '01'))",
//         fields: ["current_cycle","cycle_details"],
//         view: "Grid view"
//     }).all()
    
//     let curr_cycle = record[0].fields.current_cycle
//     let c_c_details = JSON.parse(record[0].fields.cycle_details)[curr_cycle].lottery
    
//     return c_c_details
    

