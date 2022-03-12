const fetchData = (url) => {
    return new Promise(
        (resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open('GET', url, true);

            req.onreadystatechange = () => {
                if(req.readyState === 4) {
                    (req.status === 200)
                    ? resolve(JSON.parse(req.responseText))
                    : reject([new Error(`Request Ready State: ${req.readyState}, Status: ${req.status}, from URL: ${url}`), url])
                }
            }

            req.send();
        }
    ) 
}

export default fetchData;