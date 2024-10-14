'use client';

import { useState } from 'react';

// Define the type for the links array
interface Link {
  href: string;
  text: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter links based on the search term
  const filteredLinks = links.filter((link) =>
    link.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{paddingBottom:'10px',fontWeight:'bold',fontFamily:'monospace',fontSize:'20px'}}>Link Scraper</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Input box and button in the middle */}
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter website URL"
            style={{ padding: '10px', width: '300px', marginRight: '10px', color: 'black' }}
          />
          <button onClick={handleScrape} style={{ padding: '10px', borderBlockColor: 'blueviolet', backgroundColor: 'blue' }}>
            Scrape Links
          </button>
        </div>

        {/* Search input aligned to the right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 'auto', marginTop: '-10px',paddingRight:'20px',paddingTop:'5px' }}>
 
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearchChange}
    placeholder="Search Term"
    style={{
      padding: '10px',
      width: '200px',
      color: 'black',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />
   <h1 style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '20px'}}>Search Term here</h1>
</div>

      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ paddingTop: '20px' }}>
        {filteredLinks.map((link, index) => (
          <li key={index} style={{ paddingLeft: '25px', marginBottom: '10px' }}>
            <span style={{ color: 'white' }}>{link.text}</span>{' '}
            <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
              - {link.href}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
