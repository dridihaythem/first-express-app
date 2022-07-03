const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.listen(3000, () => console.log(`Server is listening on port ${port}`));
