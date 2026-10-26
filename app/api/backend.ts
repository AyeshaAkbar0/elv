'use server';
export async function getData(endpoint: string) {
  const url =process.env.API_URL;
  const key =process.env.WOOCOMMERCE_CONSUMER_KEY ;
  const secret =process.env.WOOCOMMERCE_CONSUMER_SECRET;
  console.log(`[DEBUG] Attempting to fetch: ${url}/wp-json/wc/v3/${endpoint}`);
  console.log(`[DEBUG] Key available: ${!!key}, Secret available: ${!!secret}`);
  if (!key || !secret || !url) {
    console.error("[ERROR] Missing WooCommerce environment variables!");
    return [];
  }
  const base64Credentials = Buffer.from(`${key}:${secret}`).toString('base64');
  const endpointUrl = `${url}/wp-json/wc/v3/${endpoint}?per_page=100`;
  try {
    const res = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`[WooCommerce Error] Status: ${res.status} ${res.statusText}`);
      console.error(`[WooCommerce Error Response]:`, errorBody);
      return [];
    }

    const data = await res.json();
    console.log(`[SUCCESS] Fetched ${data.length} items from ${endpoint}`);
    return data;
  } catch (err) {
    console.error(`[Fetch Exception for ${endpoint}]:`, err);
    return [];
  }
}
export default async function GetData() {
  const [products, categories] = await Promise.all([
    getData("products"),
    getData("products/categories"),
  ]);
  return [products, categories];
}