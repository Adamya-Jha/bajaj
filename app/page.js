"use client";
import { useState } from 'react';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate JSON input
      const parsedInput = JSON.parse(jsonInput);

      // Call your REST API using fetch
      const res = await fetch(`/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log(data)
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (options.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (options.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (options.includes('Highest lowercase alphabet')) {
      filteredResponse.highestLowercaseAlphabet = response.highestLowercaseAlphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            JSON Input:
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
            placeholder="Enter your JSON here..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {response && (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Options:
            </label>
            <select
              multiple
              onChange={handleOptionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}
