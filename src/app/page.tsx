'use client';

import { useState } from 'react';

// Define the type for the links array
interface Link {
  href: string;
  text: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<Link[]>([]);  // Set the correct type for links
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setLinks(data.links);
      }
    } catch (err) {
      setError('Failed to scrape the website');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Link Scraper</h1>
      <input
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Enter website URL"
        style={{ padding: '10px', width: '300px', marginRight: '10px',color:"black" }}
      />
      <button onClick={handleScrape} style={{ padding: '10px',borderBlockColor:"blueviolet",backgroundColor:'blue' }}>
        Scrape Links
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{paddingTop:'10px'}}>
        {links.map((link, index) => (
          <li key={index}>
            <span  style={{color: 'white',paddingLeft:'25px'}}>{link.text} </span>  
            <a href={link.href} target="_blank" rel="noopener noreferrer" style={{color: 'blue' }}>
                 -  {link.href}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
