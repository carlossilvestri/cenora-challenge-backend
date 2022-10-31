import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { Cruise } from './interfaces';

@Injectable()
export class CruiseService {
  async findAll() {
    const hostname = 'https://www.carnival.com';
    const URL = `${hostname}/cruise-ships.aspx`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    await page.goto(URL);
    const html = await page.evaluate(() => {
      return document.body.innerHTML;
    });
    const $ = cheerio.load(html);
    // Arrays
    const cruises: Cruise[] = [];
    const sailsTo: string[] = [];
    const sailsFrom: string[] = [];
    const durations: string[] = [];
    const images: string[] = [];

    // Extra contants
    const sailTo = 'Sail To:';
    const sailFrom = 'Sail From:';
    const duration = 'Duration:';
    // Get all sail to, sail from and duration
    $('.text ul li').each(function () {
      let sentence: string = $(this).text();
      if (sentence.includes(sailTo)) {
        sentence = sentence.replace(`${sailTo} `, '');
        sailsTo.push(sentence);
      }
      if (sentence.includes(sailFrom)) {
        sentence = sentence.replace(`${sailFrom} `, '');
        sailsFrom.push(sentence);
      }
      if (sentence.includes(duration)) {
        sentence = sentence.replace(`${duration} `, '');
        durations.push(sentence);
      }
    });
    // Get all the titles
    const titles = [];
    $('h2.title.ccl-dsk a').each(function () {
      titles.push($(this).text());
    });

    // Get all the images
    $('.image img').each(function () {
      const img: string = hostname + $(this).attr('src');
      images.push(img);
    });
    // Combine data
    for (let index = 0; index < titles.length; index++) {
      const obj: Cruise = {
        title: titles[index],
        sail_to: sailsTo[index],
        sail_from: sailsFrom[index],
        duration: durations[index],
        image: images[index],
      };
      cruises.push(obj);
    }
    await browser.close();
    return cruises;
  }
}
