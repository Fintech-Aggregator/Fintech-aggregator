"use client";

import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import { apiData, codeExamples } from "./documentaion-data";

export default function APIDocumentation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 10);
    }
  }, [isClient]);

  return (
    <section className="px-[clamp(5rem,10vw,60rem)] py-10">
      <h1 className="text-3xl font-bold my-10">API Usage Documentation</h1>
      <h2 className="text-primary text-2xl font-semibold">Overview</h2>
      <p className="font-medium my-4">
        This documentation provides an overview of API endpoints available for retrieving financial firm data in
        different regions. The API allows users to fetch information about licensed firms in Hong Kong, Lithuania, and
        the United Kingdom, covering e-money firms and firms with PSD permissions.
      </p>
      <h2 className="text-primary text-2xl font-semibold my-4">Base URL</h2>

      {isClient && (
        <pre className="rounded-xl bg-gray-100 p-3">
          <code className="language-python">{`https://fintech-aggregator.com/api/`}</code>
        </pre>
      )}
      <h2 className="text-primary text-2xl font-semibold my-4">Endpoints</h2>

      {apiData.map((item, index) => (
        <div key={index} className="my-6">
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <h4 className="text-xl font-semibold my-4">Endpoint:</h4>
          {isClient && (
            <pre className="rounded-xl bg-gray-100 p-3">
              <code className="language-python">{item.endpoint}</code>
            </pre>
          )}
          <h4 className="text-lg font-medium my-4">
            <b>Description:</b> {item.description}
          </h4>
          <h4 className="text-xl font-semibold my-4">Response Example:</h4>
          {isClient && (
            <pre className="rounded-xl bg-gray-100 p-3 overflow-x-auto">
              <code className="language-javascript">{item.response}</code>
            </pre>
          )}
        </div>
      ))}

      <h2 className="text-primary text-2xl font-semibold my-6">Code Examples</h2>
      {codeExamples.map((example, index) => (
        <div key={index} className="my-4">
          <h3 className="text-xl font-semibold">{example.language}</h3>
          {isClient && (
            <pre className="rounded-xl bg-gray-100 p-3">
              <code className="language-javascript">{example.code}</code>
            </pre>
          )}
        </div>
      ))}

      <h2 className="text-primary text-2xl font-semibold my-6">Contact</h2>
      <p>
        For any issues or inquiries regarding the API, please contact our support team at
        <b> support@fintech-aggregator.com</b>
      </p>
    </section>
  );
}
