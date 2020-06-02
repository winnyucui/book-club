import {Service, Interservice} from './_defs'

const airtable_base = require('airtable').base(process.env.AIRTABLE_DB_ID);
const goodreads = require('goodreads-api-node');

const gr_credentials = {
    key: process.env.GOODREADS_API_KEY,
    secret: process.env.GOODREADS_API_SECRET
};

const gr = goodreads(gr_credentials);


// async function authenticate_service() {
// }
// authenticate only once
// authenticate_service()




// ! : by convention, databases use all lowercase
// let airtable_service = new Service("airtable", { "table_name": "nominations" })

export async function get_data(source: Service, route: string) {
    if (source.service_name == "airtable") {
        if (
            route == "/nominated-books" ||
            route == "/nominated-books/"
        ) {  
            let airtable_data = await get_airtable_data(
                source,
                source.query.table_name,
                route)
                
            let interservice_1 = await process_airtable_data(airtable_data, source, route)
            
            let next_services = interservice_1.next_services
            let goodreads_data = {}

            for (const key in next_services) {
                let next_source = next_services[key]
                let raw_data = await get_goodreads_data(
                    next_source,
                    next_source.query.title,
                    route)
                goodreads_data[key] = raw_data
            }

            let interservice_2 = await process_goodreads_data(goodreads_data, source, route)
            
            let final_data = await merge_data([interservice_1.formatted_data, interservice_2.formatted_data])
            // console.log("final_data", final_data)
            return final_data
        }
        
    }
    if (source.service_name == "goodreads") {

    }
}

// GET_SERVICE_DATA METHODS
// ==========================================================================

async function get_airtable_data(source:Service, query:string, route:string) {
    let table_base = await airtable_base(query)
    if (route == "/nominated-books" || route == "/nominated-books/") {
        let data = table_base.select({
            filterByFormula: "NOT({uid} = '')",
            fields: ["uid", "title", "author", "nominator", "comments"],
            view: "Grid view"
        }).all()
        return await data   
    }
    // ...
}

async function get_goodreads_data(source:Service, query:string, route:string) {
    if (route == "/nominated-books" || route == "/nominated-books/") { 
        let goodreads_data = gr.searchBooks({ q: query, page: 1, field: 'title' });
        return goodreads_data
    }

}

// PROCESS_SERVICE_DATA METHODS
// ==========================================================================

async function process_airtable_data(raw_data, source, route):Promise<Interservice> {
    if (
        route == "/nominated-books" ||
        route == "/nominated-books/"
    ) { 
        let formatted_data = {}
        let next_services = {}
        await raw_data.forEach((raw_datum, i) => {
            let formatted_datum = {
                "title": raw_datum.get("title"),
                "author": raw_datum.get("author"),
                "nominator": raw_datum.get("nominator"),
                "comments": raw_datum.get("comments"),
            }
            formatted_data[i] = formatted_datum
            
            let next_service = new Service("goodreads", { "title": raw_datum.get("title") }, source.execution_order+1, source)
            next_services[i] = next_service
        })
        
        let interservice_step = new Interservice(formatted_data, next_services)
        return interservice_step
    }
}

async function process_goodreads_data(raw_data, source, route) {
    if (route == "/nominated-books" || route == "/nominated-books/") {
        let formatted_data = {}
        for (const key in raw_data) {
            let check = raw_data[key].search.results.work
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
                    formatted_data[key] = book_media
                }
            } catch(err) {
                console.error(err)
            }
        }
        let interservice_step = new Interservice(formatted_data, [])
        return interservice_step
    
    }

}

// MERGE_DATA METHOD
// ==========================================================================

async function merge_data(datasets) {
    let merged_data = Object.keys(datasets[0]).map((key) => {
        let merged_item = {}
        for (const dataset of datasets) {
            merged_item = {
                ...merged_item,
                ...dataset[key]
            }
        }
        return merged_item
    })
    return merged_data
}

