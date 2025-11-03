import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import './index.css'

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "javascript",
  });
  const [filterLanguage, setFilterLanguage] = useState("all");

  const languages = ["javascript", "php","laravel", "python", "html","nextjs","reactjs"];

  useEffect(() => {
    axios
      .get("http://localhost:4000/snippets")
      .then((res) => setSnippets(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/snippets", form);
    setSnippets([res.data, ...snippets]);
    setForm({ title: "", code: "", language: "javascript" });
  };

  const filteredSnippets =
    filterLanguage === "all"
      ? snippets
      : snippets.filter((s) => s.language === filterLanguage);

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🧠 Code Snippet Manager
        </h1>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title
            </label>
            <input
              className="w-full p-2 border rounded-md"
              placeholder="e.g. Fetch API in JS"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Code</label>
            <textarea
              className="w-full p-2 border rounded-md font-mono text-sm"
              rows={5}
              placeholder="Paste your code here..."
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Language
              </label>
              <select
                className="p-2 border rounded-md"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow"
            >
              + Add Snippet
            </button>
          </div>
        </form>

        {/* Filter Section */}
        <div className="mb-6">
          <label className="text-gray-700 font-medium mr-2">
            Filter by language:
          </label>
          <select
            className="p-2 border rounded-md"
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
          >
            <option value="all">All</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Snippets List */}
        <div className="space-y-6">
          {filteredSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {snippet.title}
                </h2>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {snippet.language}
                </span>
              </div>
              <pre className="bg-gray-100 rounded p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                {snippet.code}
              </pre>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 mt-3 rounded-lg font-medium shadow"
                onClick={() => {
                  navigator.clipboard.writeText(snippet.code).then(() => {
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "success",
                      title: "Copy Successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                    });
                  });
                }}
              >
                📋 Copy to clipboard
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
