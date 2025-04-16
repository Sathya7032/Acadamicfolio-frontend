import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Container, Grid, useTheme } from "@mui/material";
import { FiCode, FiChevronRight } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { ThemeContext } from "../components/ThemeContext";
import Base from "../components/Base";
import image from "../styles/astronaut2.png";

const CodeTopics = () => {
  const baseUrl = "https://acadamicfolio.pythonanywhere.com";
  const { url } = useParams();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const muiTheme = useTheme();

  // Style constants
  const styles = {
    container: {
      minHeight: "100vh",
      padding: muiTheme.spacing(4),
      transition: "all 0.3s ease",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      padding: muiTheme.spacing(2),
      marginBottom: muiTheme.spacing(1),
      borderRadius: muiTheme.shape.borderRadius,
      transition: "all 0.2s ease",
      "&:hover": {
        transform: "translateX(8px)",
        boxShadow: muiTheme.shadows[2],
      },
    },
    illustration: {
      borderRadius: "24px",
      boxShadow: muiTheme.shadows[4],
      position: "sticky",
      top: "100px",
    },
  };

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/languages/${url}/codes/`);
        setCodes(response.data);
      } catch (error) {
        console.error("Error fetching codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, [url]);

  return (
    <Base>
      <Box sx={{ 
        bgcolor: theme === "light" ? "background.default" : "grey.900",
        color: theme === "light" ? "text.primary" : "common.white",
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              pt: 4,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            <FiCode style={{ marginRight: "12px" }} />
            Select Program
          </Typography>

          <Grid container spacing={4} sx={{ py: 4 }}>
            <Grid item xs={12} md={8}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <ClipLoader
                    color={theme === "light" ? muiTheme.palette.text.primary : "#fff"}
                    size={50}
                  />
                </Box>
              ) : codes.length > 0 ? (
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {codes.map((code, index) => (
                    <Box
                      component="li"
                      key={code.id}
                      sx={{
                        ...styles.listItem,
                        bgcolor: theme === "light" ? "grey.100" : "grey.800",
                      }}
                    >
                      <a
                        href={`/languages/codes/${code.url}/`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              bgcolor: "primary.main",
                              color: "common.white",
                              width: 32,
                              height: 32,
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 2,
                            }}
                          >
                            {index + 1}
                          </Box>
                          {code.title}
                        </Typography>
                        <FiChevronRight size={20} />
                      </a>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ py: 4, color: "text.secondary" }}
                >
                  No programs available
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={styles.illustration}>
                <img
                  src={image}
                  alt="Coding concepts"
                  className="img-fluid"
                  style={styles.illustration}
                />
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  sx={{ mt: 2, color: "text.secondary" }}
                >
                  Explore practical programming examples
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Base>
  );
};

export default CodeTopics;