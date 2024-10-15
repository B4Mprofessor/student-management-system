import React, { useState, useEffect } from "react";

const StudentForm = ({ addStudent, updateStudent, editingStudent }) => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    grade: "A",
    enrollmentStatus: true,
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    } else {
      setStudent({
        name: "",
        age: "",
        grade: "A",
        enrollmentStatus: true,
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }
    setStudent({ name: "", age: "", grade: "A", enrollmentStatus: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={student.age}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="grade"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Grade
        </label>
        <select
          id="grade"
          name="grade"
          value={student.grade}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {["A", "B", "C", "D", "F"].map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enrollmentStatus"
          name="enrollmentStatus"
          checked={student.enrollmentStatus}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="enrollmentStatus"
          className="ml-2 block text-sm text-gray-900"
        >
          Active
        </label>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
