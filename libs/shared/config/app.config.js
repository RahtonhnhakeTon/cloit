export default () => ({
   app: {
       apiUrl: process.env["NEXT_PUBLIC_API_URL"] || 'http://localhost:3001',
   }
});
