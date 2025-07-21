// ApiStack.js
import React from 'react';
import './ApiStack.css';

const ApiStack = () => (
  <div className="api-stack">
    <h1 className="api-stack__title">API Stack</h1>

    <section className="api-stack__section">
      <h2>Introduction</h2>
      <p>
        Our RESTful API lets you automatically detect hate speech in Sinhala text,
        power chat-moderation tools, build analytics dashboards, or integrate with
        any downstream application in minutes.
      </p>
    </section>

    <section className="api-stack__section">
      <h2>Technology Stack</h2>
      <div className="api-stack__table-container">
        <table className="api-stack__table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web framework</td>
              <td>FastAPI (Python)</td>
              <td>Rapid async HTTP endpoints, auto-docs</td>
            </tr>
            <tr>
              <td>ASGI server</td>
              <td>Uvicorn</td>
              <td>High-performance request handling</td>
            </tr>
            <tr>
              <td>ML framework</td>
              <td>Transformers + PyTorch</td>
              <td>Token-level hate speech classification</td>
            </tr>
            <tr>
              <td>OCR / Vision</td>
              <td>OpenCV + pytesseract</td>
              <td> image-to-text ingestion</td>
            </tr>
            <tr>
              <td>Data storage</td>
              <td>MongoDB</td>
              <td>Storing logs, rate limits, user keys</td>
            </tr>
            
            <tr>
              <td>Cloud / Hosting</td>
              <td>AWS / GCP / Heroku</td>
              <td>Scalable production deployment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="api-stack__section">
      <h2>Getting Started</h2>
      <h3>Authentication</h3>
      <p>Include your API key in the header:</p>
      <pre><code>Authorization: Bearer &lt;ex-api_key_123e4567-e89b-12d3-a456-426614174000&gt;</code></pre>
      <h3>Base URL</h3>
      <pre><code>https://api.hariwachana.lk/v1/</code></pre>
    </section>

    <section className="api-stack__section">
      <h2>Endpoints</h2>
      <div className="api-stack__table-container">
        <table className="api-stack__table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>/v1/predict/text</td>
              <td>POST</td>
              <td>Classify input text, returns per-token labels</td>
            </tr>
            <tr>
              <td>/v1/predict/image</td>
              <td>POST</td>
              <td>OCR + classify text inside an image</td>
            </tr>
            <tr>
              <td>/v1/models</td>
              <td>GET</td>
              <td>List available model versions &amp; metadata</td>
            </tr>
            <tr>
              <td>/v1/feedback</td>
              <td>POST</td>
              <td>Submit corrections to improve the model</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="api-stack__section">
      <h2>Request / Response Examples</h2>
      <pre>
        <code>
{`curl -X POST https://api.hariwachana.lk/v1/predict/text \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "ඔය බනින්නෙ . . හරකා , මී හරකා . . ."}'`}</code>
      </pre>
      <pre>
        <code>
{`{
  "tokens": ["ඔය", "බනින්නෙ", "හරකා", "මී", "හරකා"],
  "labels": ["O", "O", "Hate", "O", "Hate"]
}`}</code>
      </pre>
    </section>

    <section className="api-stack__section">
      <h2>Data Models</h2>
      <pre><code>{`// TextPredictionRequest
{
  "text": "string"
}

// TextPredictionResponse
{
  "tokens": string[],
  "labels": ("O" | "Hate")[]
}`}</code></pre>
    </section>

    <section className="api-stack__section">
      <h2>Error Handling &amp; Status Codes</h2>
      <ul>
        <li><strong>200 OK</strong> – success</li>
        <li><strong>400 Bad Request</strong> – malformed JSON or missing field</li>
        <li><strong>401 Unauthorized</strong> – invalid API key</li>
        <li><strong>429 Too Many Requests</strong> – rate limit exceeded</li>
        <li><strong>500 Internal Server Error</strong> – unexpected failure</li>
      </ul>
      <pre><code>{`{
  "error": "Missing required field 'text'."
}`}</code></pre>
    </section>

    <section className="api-stack__section">
      <h2>Rate Limiting &amp; Fair Use</h2>
      <p>
        By default, each API key is allowed 100 requests per minute. Exceeding this
        limit returns a <code>429 Too Many Requests</code> error. Contact support
        to increase your quota.
      </p>
    </section>

    <section className="api-stack__section">
      <h2>SDKs &amp; Client Libraries</h2>
      <p>
        Install our Python client for quick integration:
      </p>
      <pre><code>pip install hariwachana-client</code></pre>
    </section>

    <section className="api-stack__section">
      <h2>Versioning &amp; Changelog</h2>
      <p>
        We follow <code>/v1/</code> in our base URL. Check our
        <a href="/changelog"> changelog</a> for updates and breaking changes.
      </p>
    </section>

    <section className="api-stack__section">
      <h2>Support &amp; Contact</h2>
      <p>
        For questions or support, email
        <a href="mailto:dev@hariwachana.lk"> dev@hariwachana.lk</a> or join our
        <a href="https://discord.gg/your-invite"> Discord channel</a>.
      </p>
    </section>
  </div>
);

export default ApiStack;
