export default () => ({
   app: {
       apiUrl: process.env["API_URL"] || 'http://localhost:3001',
   }
});
