export const SWRfetcher = (url: string) => fetch(url, {
    cache: "no-store",
}).then(res => res.json())