import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links = [];

    $('a').each((index, element) => {
      const href = $(element).attr('href');
      const text = $(element).text().trim();
      links.push({ href, text: text || 'No Text' });
    });

    return NextResponse.json({ links }, { status: 200 });
  } catch (error) {
    console.error('Error scraping:', error);
    return NextResponse.json({ error: 'Failed to scrape the website' }, { status: 500 });
  }
}
