import React, { useState } from "react";

const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

function TableWithPagination() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const start = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(start, start + itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Pagination with Table</h2>
      <table border="1" className="mb-3 w-full text-left">
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TableWithPagination;
