import Pool from 'pg-pool'

// by default the pool uses the same
// configuration as whatever `pg` version you have installed
export const pool = new Pool({
    // database: 'postgres',
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    allowExitOnIdle: true
})

    // with async/await
    // (async () => {
    //     var client = await pool.connect()
    //     try {
    //         var result = await client.query('select $1::text as name', ['brianc'])
    //         console.log('hello from', result.rows[0])
    //     } finally {
    //         client.release()
    //     }
    // })().catch(e => console.error(e.message, e.stack))

