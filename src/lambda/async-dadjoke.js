// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

const mysql = require('serverless-mysql')({
  config: {
    host     : 'trialdb.c7ksi0dlwx8a.us-east-2.rds.amazonaws.com',
    database : 'dbname',
    user     : 'dbuser',
    password : 'password'
  }
})

// Main handler function
exports.handler = async (event, context, callback) => {
  // Run your query
  let results = await mysql.query('SELECT * FROM item_info LIMIT 10')


  // Run clean up function
  await mysql.end()

  console.log('working')
  console.log(results)

  // Return the results
  callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: results})
      });
}

// import fetch from "node-fetch"
// export async function handler(event, context) {
//   try {
//     const response = await fetch("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
//     if (!response.ok) {
//       // NOT res.status >= 200 && res.status < 300
//       return { statusCode: response.status, body: response.statusText }
//     }
//     const data = await response.json()
//
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ msg: data.joke })
//     }
//   } catch (err) {
//     console.log(err) // output to netlify function log
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
//     }
//   }
// }
