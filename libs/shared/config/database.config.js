export default () => ({
    database: {
        url: process.env['DATABASE_URL'] || 'postgres://localhost:5432',
    }
})