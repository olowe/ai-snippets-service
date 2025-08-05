import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function Welcome() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snippets, setSnippets] = useState<any[]>([]);
  const [latestSnippet, setLatestSnippet] = useState<any>(null);

  // Load all snippets on mount
  useEffect(() => {
    fetchAllSnippets();
  }, []);

  const fetchAllSnippets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/snippets`);
      if (response.ok) {
        const data = await response.json();
        setSnippets(data);
      }
    } catch (err) {
      console.error("Failed to fetch snippets:", err);
    }
  };

  const createSnippet = async () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/snippets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (response.ok) {
        const newSnippet = await response.json();
        setLatestSnippet(newSnippet);
        setText("");
        fetchAllSnippets(); // Refresh the list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create snippet");
      }
    } catch (err) {
      setError("Network error. Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.ctrlKey && e.key === "Enter") {
      createSnippet();
    }
  };

  const truncateText = (text: string, maxLength = 100) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          AI Snippet Generator
        </h1>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create New Snippet
          </h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Paste your content here... (Ctrl+Enter to submit)"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {text.length} characters
            </span>
            <button
              onClick={createSnippet}
              disabled={loading || !text.trim() || text.trim().length < 30}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating..." : "Generate Summary"}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Latest Result */}
        {latestSnippet && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              ✅ Latest Snippet Created
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">ID:</span>
                <span className="ml-2 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {latestSnippet.id}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Original Text:
                </span>
                <p className="mt-1 text-gray-600 italic">
                  "{truncateText(latestSnippet.text, 150)}"
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">AI Summary:</span>
                <p className="mt-1 text-gray-800 font-medium bg-blue-50 p-3 rounded">
                  {latestSnippet.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Snippets List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            All Snippets ({snippets.length})
          </h3>

          {snippets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No snippets yet. Create your first one above!
            </p>
          ) : (
            <div className="space-y-4">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {snippet.id}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Original:
                      </h4>
                      <p className="text-sm text-gray-600 italic">
                        "{truncateText(snippet.text)}"
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Summary:
                      </h4>
                      <p className="text-sm text-gray-800 bg-blue-50 p-2 rounded">
                        {snippet.summary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Status */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Connected to API at {API_BASE_URL}
        </div>
      </div>
    </div>
  );
}
