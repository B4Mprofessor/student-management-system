import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import { generateUniqueId } from "./utils/helper";
import "./styles/index.css"; // Ensure you import your CSS file

const App = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingStudent, setEditingStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    if (storedStudents.length > 0) {
      setStudents(storedStudents);
      setFilteredStudents(storedStudents);
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
    filterAndSortStudents();
  }, [students]);

  useEffect(() => {
    filterAndSortStudents();
  }, [searchTerm, filterStatus, sortConfig]);

  const filterAndSortStudents = () => {
    let filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (student) => student.enrollmentStatus === (filterStatus === "active")
      );
    }

    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredStudents(filtered);
  };

  const addStudent = (student) => {
    const newStudent = { ...student, id: generateUniqueId() };
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const clearAllStudents = () => {
    setShowModal(true);
  };

  const confirmClearAllStudents = () => {
    setStudents([]);
    localStorage.removeItem("students");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative px-4 py-10 mx-auto w-full max-w-3xl">
        <div className="relative bg-white shadow-lg rounded-3xl p-8 sm:p-12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Student Record Management System
          </h1>
          <div className="flex mb-6 space-x-4 items-center">
            <div className="flex-1">
              <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div className="flex-1">
              <FilterDropdown setFilterStatus={setFilterStatus} />
            </div>
            <div className="flex-1">
              <button
                onClick={clearAllStudents}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete All Records
              </button>
            </div>
          </div>
          <StudentForm
            addStudent={addStudent}
            updateStudent={updateStudent}
            editingStudent={editingStudent}
          />
          <div className="overflow-x-auto mt-8">
            <StudentTable
              students={filteredStudents}
              deleteStudent={deleteStudent}
              setEditingStudent={setEditingStudent}
              handleSort={handleSort}
              sortConfig={sortConfig}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete all student data? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-1 px-3 bg-gray-300 text-gray-700 text-sm rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearAllStudents}
                className="py-1 px-3 bg-red-600 text-white text-sm rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
