import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MKBox from "components/MKBox";
import Card from "@mui/material/Card";
import DefaultNavbar from "components/Navbar";
import SimpleFooter from "components/Footer";
import TodoGrid from "./sections/ToDoGrid";
import { logout } from "features/authSlice/slice";
import { useTheme } from "@mui/material/styles";
import routes from "routes";
import todoService from "api/todoService";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function WorkSpacePage() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const fetchTodos = async () => {
    try {
      const response = await todoService.getTodos();
      console.log("Fetched todos:", response);
      setTodos(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks.");
      if (err.response && err.response.status === 401) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [dispatch]);

  if (error) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <h2>Error: {error}</h2>
      </MKBox>
    );
  }

  return (
    <MKBox display="flex" flexDirection="column" minHeight="100vh">
      <DefaultNavbar
        brand="Simplicity"
        routes={routes}
        transparent
        light
        action={{
          type: "logout",
          route: "/",
          label: "Sign Out",
          color: "default",
        }}
      />
      <MKBox
        minHeight="15vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>

      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -5,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          [theme.breakpoints.down("sm")]: {
            mt: 1,
          },
        }}
      >
        <TodoGrid todos={todos} refreshTodos={fetchTodos} />
      </Card>

      <MKBox pt={6} px={1} mt="auto">
        <SimpleFooter />
      </MKBox>
    </MKBox>
  );
}

export default WorkSpacePage;
