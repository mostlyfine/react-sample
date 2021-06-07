import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const App = (props) => {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [books, setBooks] = useState([]);

  const fetchData = async (searchWord) => {
    const queryParams = new URLSearchParams({ q: searchWord });
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${queryParams}`);
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    if(keyword) {
      document.title = `${keyword} - ${props.title}`;
      fetchData(keyword).then(result => setBooks(result.items));
    }
  }, [keyword]);

  const handleSearch = useCallback((e) => {
    if (e.which === 13) {
      e.preventDefault();
      setKeyword(e.target.value);
    }
  }, []);

  return (
    <>
      <h2>{props.title}</h2>
      <input type="text" defaultValue={keyword} onKeyPress={handleSearch} />
      <ul>
        { books.map((book) => (
          <li key={book.id}>
            <a target="_blank" href={book.volumeInfo.previewLink} rel="noreferrer">
              <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ''} />
              {book.volumeInfo.title}
            </a>
          </li>
        )) }
      </ul>
    </>
  );
};

App.propTypes = {
  title: PropTypes.string,
  defaultKeyword: PropTypes.string
};

export default App;
