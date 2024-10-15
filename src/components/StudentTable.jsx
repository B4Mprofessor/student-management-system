import React from "react";

const StudentTable = ({
  students,
  deleteStudent,
  setEditingStudent,
  handleSort,
  sortConfig,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-4 text-left w-1/6">ID</th>
            <th
              className="py-3 px-4 text-left cursor-pointer w-1/6"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th
              className="py-3 px-4 text-left cursor-pointer w-1/6"
              onClick={() => handleSort("age")}
            >
              Age{" "}
              {sortConfig.key === "age" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th
              className="py-3 px-4 text-left cursor-pointer w-1/6"
              onClick={() => handleSort("grade")}
            >
              Grade{" "}
              {sortConfig.key === "grade" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th className="py-3 px-4 text-left w-1/6">Status</th>
            <th className="py-3 px-4 text-center w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-4 text-left whitespace-nowrap truncate font-bold">
                {student.id}
              </td>
              <td className="py-3 px-4 text-left whitespace-nowrap">
                {student.name}
              </td>
              <td className="py-3 px-4 text-left">{student.age}</td>
              <td className="py-3 px-4 text-left">{student.grade}</td>
              <td className="py-3 px-4 text-left">
                <span
                  className={
                    student.enrollmentStatus
                      ? "bg-green-100 text-green-700 font-bold py-1 px-3 rounded-full"
                      : "bg-red-100 text-red-700 font-bold py-1 px-3 rounded-full"
                  }
                >
                  {student.enrollmentStatus ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="mr-2 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
