export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      const notionUrl = 'https://api.notion.com' + url.pathname + url.search;
  
      const res = await fetch(notionUrl, {
        method: request.method,
        headers: {
          'Authorization': `Bearer ${env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: request.method !== 'GET' ? request.body : undefined,
      });
  
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://tuosito.com', // ← cambia con il tuo dominio
        }
      });
    }
  }