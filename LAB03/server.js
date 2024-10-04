const connect = require('connect');
const url = require('url');

// Function to perform the math operations
function calculate(req, res) {
  const queryObject = url.parse(req.url, true).query;
  const method = queryObject.method;
  const x = parseFloat(queryObject.x);
  const y = parseFloat(queryObject.y);
  let result;

  if (!method || isNaN(x) || isNaN(y)) {
    res.end('Error: Please provide a valid method and numbers for x and y.');
    return;
  }

  switch (method) {
    case 'add':
      result = `${x} + ${y} = ${x + y}`;
      break;
    case 'subtract':
      result = `${x} - ${y} = ${x - y}`;
      break;
    case 'multiply':
      result = `${x} * ${y} = ${x * y}`;
      break;
    case 'divide':
      if (y === 0) {
        result = 'Error: Division by zero is not allowed.';
      } else {
        result = `${x} / ${y} = ${x / y}`;
      }
      break;
    default:
      result = 'Error: Invalid method. Use add, subtract, multiply, or divide.';
  }

  res.end(result);
}

// Create a connect server and use the calculate function as middleware
const app = connect();
app.use('/lab2', calculate);

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
