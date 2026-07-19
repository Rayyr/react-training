import React, { useState, useContext, useMemo, useCallback } from "react";
import StudentItem from "../components/UserDefined UI/StudentItem.jsx";
import FilterBar from "../components/UserDefined UI/FilterBar.jsx";
import { Typography } from "@mui/material";
import { StudentContext } from "../context/StudentContext.js";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { roles } from "../constatnts/generalConstants.js";
import { AlertDestructive } from "../components/BuiltIn UI/AlertDestructive.jsx";

function StudentsList({ isBlocked, setIsBlocked }) {
  const { removeStudent, students, isLoading, errors } =
    useContext(StudentContext);

  const [filters, setFilters] = useState({
    course: "",
    gpa: "",
    username: "",
  });

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesUsername =
        filters.username === "" ||
        student.username.toLowerCase() === filters.username.toLowerCase();

      const matchesGpa = filters.gpa === "" || Number(student.gpa) === Number(filters.gpa);

      const matchesCourse =
        filters.course === "" || student.course === filters.course;

      return matchesUsername && matchesGpa && matchesCourse;

      //empty here mean all filter
    });
  }, [students, filters]);

  const handleDelete = useCallback(
    async (e) => {
      try {
        await removeStudent(e.email);
        toast.success("Student has been deleted successfully!", {
          style: {
            width: "500px",
          },
          onOpen: () => setIsBlocked(true),
          onClose: () => setIsBlocked(false),
        });
      } catch (err) {
        toast.error(err.message || errors.DELETE, {
          style: {
            width: "500px",
          },
          onOpen: () => setIsBlocked(true),
          onClose: () => setIsBlocked(false),
        });
      }
    },
    [errors.DELETE, setIsBlocked, removeStudent],
  );

  return (
    <>
      <FilterBar filters={filters} setFilters={setFilters} />

      {!errors.GET ? (
        isLoading === false ? (
          filteredStudents.length === 0 ? (
            <Typography
              variant="h5"
              sx={{
                marginTop: "30px",
                textAlign: "center",
                color: "#9F1239",
                fontWeight: "bold",
              }}
            >
              No students found 😕
            </Typography>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "100px",
                padding: "20px",
                justifyContent: "flex-start",
              }}
            >
              {filteredStudents.map((e, ind) => (
                <StudentItem
                  isBlocked={isBlocked}
                  onDeleteStudent={handleDelete}
                  content={e}
                  key={e.email}
                  role={roles.admin}
                  onlyDetails={false}
                />
              ))}
            </div>
          )
        ) : (
          <Box sx={{ color: "#4A148C", display: "flex" }}>
            <CircularProgress aria-label="Loading…" />
          </Box>
        )
      ) : (
        <AlertDestructive message={errors.GET} />
      )}
    </>
  );
}

export default StudentsList;
