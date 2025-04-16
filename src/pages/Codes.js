import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Paper, 
  Typography, 
  Container,
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CodeDisplay from "./CodeDisplay";
import { ThemeContext } from "../components/ThemeContext";
import Base from "../components/Base";

const Codes = () => {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com";
    const { url } = useParams();
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

    // Rest of the component remains the same...

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${baseUrl}/languages/codes/${url}/`);
                setTopics(data);
            } catch (err) {
                setError("Failed to load code content");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return (
        <Base>
            <Box sx={{
                minHeight: '100vh',
                bgcolor: theme === 'light' ? 'background.default' : 'grey.900',
                py: 8
            }}>
                <Container maxWidth="lg">
                    {error && (
                        <Alert severity="error" sx={{ mb: 4 }}>
                            {error}
                        </Alert>
                    )}

                    {loading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40vh'
                        }}>
                            <CircularProgress size={60} />
                        </Box>
                    ) : topics && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4
                        }}>
                            {/* Header Section */}
                            <Paper sx={{
                                px: isMobile ? 2 : 4,
                                py: 3,
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                borderRadius: 2,
                                boxShadow: 3
                            }}>
                                <Typography variant="h4" component="h4" sx={{
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1
                                }}>
                                    {topics.title}
                                </Typography>
                                
                                {/* Ad Unit */}
                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356" 
                                            crossOrigin="anonymous" />
                                    <ins className="adsbygoogle"
                                        style={{ display: 'block' }}
                                        data-ad-client="ca-pub-6919135852803356"
                                        data-ad-slot="9140112864"
                                        data-ad-format="auto"
                                        data-full-width-responsive="true" />
                                </Box>
                            </Paper>

                            {/* Code Display Section */}
                            <Paper sx={{
                                p: isMobile ? 2 : 4,
                                borderRadius: 2,
                                boxShadow: 3,
                                bgcolor: theme === 'light' ? 'background.paper' : 'grey.800'
                            }}>
                                <CodeDisplay code={topics.code} />
                            </Paper>

                            {/* Content Section */}
                            <Paper sx={{
                                p: isMobile ? 2 : 4,
                                borderRadius: 2,
                                boxShadow: 3,
                                bgcolor: theme === 'light' ? 'background.paper' : 'grey.800'
                            }}>
                                <Box sx={{
                                    '& h2': { 
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        mt: 3,
                                        mb: 2,
                                        color: 'text.primary'
                                    },
                                    '& p': {
                                        lineHeight: 1.6,
                                        mb: 2,
                                        color: 'text.secondary'
                                    },
                                    '& pre': {
                                        p: 2,
                                        borderRadius: 1,
                                        bgcolor: theme === 'light' ? 'grey.100' : 'grey.900',
                                        overflowX: 'auto'
                                    }
                                }} dangerouslySetInnerHTML={{ __html: topics.content }} />
                            </Paper>
                        </Box>
                    )}
                </Container>
            </Box>
        </Base>
    );
};

export default Codes;