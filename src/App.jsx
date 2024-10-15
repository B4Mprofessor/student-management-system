import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import { generateUniqueId } from "./utils/helper";

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

  // Load students from local storage on initial load (only runs once)
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    if (storedStudents.length > 0) {
      setStudents(storedStudents);
      setFilteredStudents(storedStudents);
    }
  }, []);

  // Save students to local storage whenever the students state changes
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
    filterAndSortStudents();
  }, [students]);

  // Filter and sort students whenever search term, filter status, or sorting changes
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

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative px-4 py-10 mx-auto w-full max-w-3xl">
        <div className="relative bg-white shadow-lg rounded-3xl p-8 sm:p-12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Student Record Management System
          </h1>
          <div className="mb-6">
            <SearchBar setSearchTerm={setSearchTerm} />
            <FilterDropdown setFilterStatus={setFilterStatus} />
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
    </div>
  );
};

export default App;
