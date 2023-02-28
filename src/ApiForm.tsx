import { useState } from "react";
import { saveAs } from "file-saver";
import { generateSwiftTypes } from "../lib/converter";

function ApiCallForm() {
  const [projectUrl, setProjectUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setLoading(true);

    const headers = {
      accept: "application/json",
      "accept-language": "fr-FR,fr;q=0.5",
      apikey: apiKey,
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      origin: "https://app.supabase.com",
      referer: "https://app.supabase.com/",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "sec-gpc": "1",
    };

    try {
      const response = await fetch(`${projectUrl}/rest/v1/`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      const fileContent = generateSwiftTypes(data);
      const fileName = "types.swift";
      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, fileName);
      console.log(data);
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="projectUrl">Project URL:</label>
        <input
          type="text"
          id="projectUrl"
          value={projectUrl}
          onChange={(event) => setProjectUrl(event.target.value)}
          className="border-2 border-green-500 rounded-md bg-[#121212] text-white p-2 w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          className="border-2 border-green-500 rounded-md bg-[#121212] text-white p-2 w-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-green-500">Loading...</p>}

      <button
        type="submit"
        className="bg-[#121212] rounded border-2 border-green-500 text-xl px-2 w-1/3 mx-auto my-5"
      >
        Generate Types
      </button>
    </form>
  );
}

export default ApiCallForm;
