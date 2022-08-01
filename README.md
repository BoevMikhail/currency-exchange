This is test app. This app can exchange currencies, show currency rate.
API - https://apilayer.com/marketplace/exchangerates_data-api (only 250 requests per month so why i use json file when service is unavailible).
I used useContext and session storage due to the request limit, and also converted currencies using math rather than via API.
If you have currency "AAA" in RATES, you get saved JSon with currencies

The app requires Node.js and npm to run - You can download it from https://nodejs.org/en/

For start App use command - "npm start"
