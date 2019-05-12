import React, { Component } from 'react';
import axios from 'axios';

class Newslist extends Component {
  constructor() {
    super();

    this.state = {
      newsTags: [],
      newsContent: [],
      tagRecord: {},
      keyWords: []
    };

    this.getAllNews = this.getAllNews.bind(this);
    this.getAllKeywords = this.getAllKeywords.bind(this);
    this.setTagElement = this.setTagElement.bind(this);
    this.setNewsElement = this.setNewsElement.bind(this);
  }

  componentDidMount() {
    this.getAllNews();
  }

  getAllNews() {
    axios
      .get('/news-feed')
      .then(res => {
        const newsList = res.data;
        const keywords = this.getAllKeywords(newsList);
        this.setTagElement(keywords);
        this.setNewsElement();
      })
      .catch(err => console.log(err));
  }

  getAllKeywords(newsList) {
    const keywords = [];
    let tagRecord = {};

    for (let n in newsList) {
      let currentKeyWords = newsList[n]['keywords'];
      for (let k in currentKeyWords) {
        var kRecord = tagRecord[currentKeyWords[k]] || [];
        kRecord.push(newsList[n]);
        tagRecord[currentKeyWords[k]] = kRecord;
      }
    }

    this.setState({ tagRecord: tagRecord });

    for (let t in tagRecord) {
      keywords.push([t, tagRecord[t].length]);
    }

    let sortedKeywords = keywords.sort((r1, r2) => r2[1] - r1[1]);

    this.setState({ keyWords: sortedKeywords });
    return sortedKeywords;
  }

  setTagElement(keywords) {
    const newsTags = [];
    for (let k in keywords) {
      const tagID = '#' + keywords[k][0];
      const elementKey = 'tag' + k;
      const singleTagElement = (
        <a
          className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
          key={elementKey}
          href={tagID}>
          {keywords[k][0]}
          <span className='badge badge-dark badge-pill'>{keywords[k][1]}</span>
        </a>
      );
      newsTags.push(singleTagElement);
    }

    this.setState({ newsTags: newsTags });
  }

  setNewsElement() {
    const newsContent = [];

    for (let t in this.state.keyWords) {
      const tag = this.state.keyWords[t][0];
      const tagHeader = (
        <h4 id={tag} key={tag + '-header'}>
          {tag}
        </h4>
      );
      newsContent.push(tagHeader);

      for (let i in this.state.tagRecord[tag]) {
        const elementKey = tag + i;
        const singleNewsElement = (
          <a
            className='list-group-item list-group-item-action'
            key={elementKey}
            href={this.state.tagRecord[tag][i]['link']}>
            <h5>{this.state.tagRecord[tag][i]['title']}</h5>
            <h6 className='text-muted'>
              {this.state.tagRecord[tag][i]['publish_date']}
            </h6>
            <p>{this.state.tagRecord[tag][i]['summary']}</p>
          </a>
        );
        newsContent.push(singleNewsElement);
      }

      newsContent.push(<br key={tag + '-br'} />);
    }
    this.setState({ newsContent: newsContent });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-4'>
          <div id='list-example' className='list-group'>
            <div className='list-group-item list-group-item-primary'>
              Hot News Topics
            </div>

            <div className='topic-tag'>{this.state.newsTags}</div>
          </div>
        </div>

        <div className='col-md-8'>
          <div
            data-spy='scroll'
            data-target='#list-example'
            data-offset='0'
            className='scrollspy-example  scroll-item'>
            {this.state.newsContent}
          </div>
        </div>
      </div>
    );
  }
}

export default Newslist;
