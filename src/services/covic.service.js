import axios from 'axios'

/**
 * This function is called to fetch data about historical events related to the "Roman Empire"
 * @returns {Promise} - A promise that resolves with data about historical events.
 */
export async function getHistoricalEvents(
    start = "1999-01-01",
    end = "2100-01-01",
    category = "terror"
) {

    /*let cache = localStorage.getItem('cache')
    if(cache) {
        cache = JSON.parse(cache)
        return cache
    }*/
    const response = await axios.get(
        `https://api.predicthq.com/v1/events?category=${category}&start.gte=${start}&end.lte=${end}&limit=150`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Z9UQ_aGHoezbUfuynOcag5jeV_6Hzm41MVG0WKsp'
            }
        }
    ).then(r => r.data.results).then(results => {
        localStorage.setItem('cache', JSON.stringify(results))
        return results
    })
    return response
}
