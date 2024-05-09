### Set up 
- npm i express cors dotenv mongoose nodemon bcryptjs

```jsx
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 8080 || process.env.PORT

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    })
})

app.listen(PORT, () => {
    console.log("Server is running");
})
```

-> Sauwr lại file index.js và chạy: npm run dev