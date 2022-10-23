import React,{ useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'
function App() {

  const [movieName , setMovieName] = useState('')
  const [review , setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([]) //make movie review array
  
  // use effect allows information from the data to be displayed at the frontend and use Axios.get to request the right url
  useEffect(()=>{

    Axios.get('http://localhost:3003/api/review')
    .then((response)=>{
      setMovieList(response.data);
    })
  }, [])
  
//setMovieList will set to the Current Moviereview list then will display after submiting to database 
  const submitReview = ()=>{
    Axios.post('http://localhost:3003/api/review/insert',
    {
      movieName:movieName,
      movieReviews:review
    }
  );

  setMovieList([
    ...movieReviewList,
    { movieName: movieName,movieReviews:review},
      ]);
     
    };

  const deleteReview = (movie)=>{
    Axios.delete(`http://localhost:3003/api/review/${movie}`);
  };

  return (
    <div className="App">
      <h1>CRUD APP</h1>
        <div className='form'>
          <label>Movie Name</label>
          <input type="text" name="movieName" onChange={(e)=>{
            setMovieName(e.target.value);
          }}/>
          <label >Review</label>
          <input type="text" name="review" onChange={(e)=>{
            setReview(e.target.value);
          }}/>

          <button onClick={submitReview}>Submit</button>

          {movieReviewList.map((val,id)=>{
            return( //creating the layout for the name and the review into cards for each movie+review pair
            <div className='cards'key={id} > 
              <h1>{val.movieName}</h1>
              <p>MovieReview : {val.movieReviews}</p>

              <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id="updateInput"/>
              <button>Update</button>
              </div>) //Alows contents to be deisplayed on the front end
          })}
        </div>
    </div>
  );
}

export default App;
