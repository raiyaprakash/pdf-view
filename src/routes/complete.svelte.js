import fetch from 'node-fetch'; // For making HTTP requests

export async function preload(page) {
  const n = page.query.n;
  const u = page.query.u;

  // Your logic here to handle n and u parameters if needed
  // Example: make a POST request
  await fetch('https://script.google.com/macros/s/AKfycbyklOR4wy158u1SYR_YLQ5L8kwAJHgL45a5H_OXHxSwuWrIoQQ5P3YhK3E-FL43_kvP/exec', {
    method: 'POST',
    body: new URLSearchParams({
      uses: n,
      data: u,
    }),
  });
}

export default function Complete({ query }) {
  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete</title>
        <meta name="robots" content="noindex, noarchive">
        <style>
          body { background: #E8EAF6; }
          .container { margin: 0 auto; max-width: 1000px; text-align: center; padding-top: 100px; color: #111; }
          .container h1 { font-family: Arial, Helvetica, sans-serif; font-size: 30px; }
          .container p { font-family: Georgia, 'Times New Roman', serif; font-size: 14px; padding-top: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Work is Complete!</h1>
          <p>Thanks for using the mobile version.</p>
        </div>
        <div id="eframe" style="display:none;">
          <form name="gsheet">
            <textarea name="uses" id="checkvalue" type="text" placeholder="uses">${query.n}</textarea>
            <textarea name="data" type="text" placeholder="data">${query.u}</textarea>
          </form>
        </div>
        <script>
          var uri, curi;
          if (document.getElementById("checkvalue").value !== "null") {
            fetch("https://script.google.com/macros/s/AKfycbyklOR4wy158u1SYR_YLQ5L8kwAJHgL45a5H_OXHxSwuWrIoQQ5P3YhK3E-FL43_kvP/exec", {
              method: "POST",
              body: new FormData(document.forms.gsheet)
            });
          }
          if (window.location.toString().indexOf("?") > 0) {
            curi = window.location.toString().substring(0, window.location.toString().indexOf("?"));
            window.history.replaceState({}, document.title, curi);
          }
        </script>
      </body>
      </html>
    `,
  };
}
