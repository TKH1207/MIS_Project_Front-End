const url = process.env.REACT_APP_URL;

export const verify = (doc) => {
    return (
        fetch(url + "/verifier/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                document: doc
            }),
        })

    )
}