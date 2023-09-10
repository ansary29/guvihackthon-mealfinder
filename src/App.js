import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from  './image/download.jpeg'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        console.log("response", response);

        if (!response.ok) {
          throw new Error("Data not fetch");
        }
        const data = await response.json();
        console.log("data", data);
        if (data.meals) {
          setSearchResults(data.meals);
          setError("");
        } else {
          setSearchResults([]);
          setError("No Food Found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (searchTerm.trim() !== "") {
      fetchPosts();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setError("Enter a food name to search");
      setSearchResults([]);
      return;
    }
     else {
      setError("");
    }
  };

  const openYouTubeVideo = (youtubeLink) => {
    window.open(youtubeLink);
  };

  return (
    <div  
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      minHeight: "100vh", 
    }}>
    <Container
    
    >
      <Row>
        <Col>
          <h1 style={{color:"white"}}>Meal Finder</h1>
          <InputGroup className="mb-3">
            <FormControl
              variant="primary"
              placeholder="Enter a food name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={() => handleSearch()}>
              Search
            </Button>
          </InputGroup>
          {error && <Alert variant="danger">{error}</Alert>}

        </Col>
      </Row>
      <Row>
        {searchResults.map((meal) => (
          <Col key={meal.idMeal} sm={6} md={4} lg={3} className="mb-4">
            <div className="card">
              <img
                src={meal.strMealThumb}
                className="card-img-top"
                alt={meal.strMeal}
              />
              <div className="card-body">
                <h5 className="card-title">{meal.strMeal}</h5>
                <Button
                  variant="info"
                  onClick={() => openYouTubeVideo(meal.strYoutube)}
                >
                  Watch Video
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}

export default App;
