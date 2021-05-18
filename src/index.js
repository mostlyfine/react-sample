import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [keyword, setKeyword] = useState('夏目漱石');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams({ q: keyword });
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${queryParams}`);
      const result = await response.json();
      setBooks(result.items);
    };
    fetchData();
    document.title = `${keyword} - ${props.title}`;
  }, [keyword]);

  const handleSearch = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      setKeyword(e.target.value);
    }
  };

  return (
    <>
      <h2>{props.title}</h2>
      <input type="text" defaultValue={keyword} onKeyPress={handleSearch} />
      <ul>
        { books.map((book) => (
          <li key={book.id}>
            <a target="_blank" href={book.volumeInfo.previewLink}>
              <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ''} />
              {book.volumeInfo.title}
            </a>
          </li>
        )) }
      </ul>
    </>
  );
};

ReactDOM.render(<App title="BookSearch" />, document.querySelector('#app'));
