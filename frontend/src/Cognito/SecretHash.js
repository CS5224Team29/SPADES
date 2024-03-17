const lambdaUrl = "https://7n63s6oj7lpz2f53i35h7d4hbq0enfge.lambda-url.us-east-1.on.aws/";

export const secretHashGenerator = async (username) => {
    const payload = {
        client_secret: "1fh2v09ih6k385hrpaje4j60goue6ap60m97flqfn78g2unpkdqr",
        username: username,
        client_id: "40goo00692fvor13eimhfhslhp",
    };

    try {
        const response = await fetch(lambdaUrl, {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await response.text();
        console.log("Lambda function response:", data);

        return data;
    } catch (error) {
        console.error("Error calling Lambda function:", error);
        throw error;
    }
};
