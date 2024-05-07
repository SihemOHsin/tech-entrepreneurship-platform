import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-entrepreneur-community',
  templateUrl: './entrepreneur-community.component.html',
  styleUrls: ['./entrepreneur-community.component.scss']
})
export class EntrepreneurCommunityComponent implements OnInit{

  blogEntries: { id: number, title: string, content: string, fullContent: string, comments: number }[] = [
    {
      id: 1,
      title: "Entrepreneur 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      fullContent: "Full content of the first blog entry Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero",
      comments: 5
    },
    {
      id: 2,
      title: "Entrepreneur 2",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur ...",
      fullContent: "Full content of the second blog entry Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero",
      comments: 0
    },
    {
      id: 3,
      title: "Entrepreneur 3",
      content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
      fullContent: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      comments: 3
    },
    {
      id: 4,
      title: "Entrepreneur 4",
      content: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      fullContent: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      comments: 0
    },
    {
      id: 5,
      title: "Entrepreneur 5",
      content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
      fullContent: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      comments: 3
    },
    {
      id: 6,
      title: "Entrepreneur 6",
      content: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      fullContent: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      comments: 0
    }
  ];

  currentPage = 1;
  entriesPerPage = 4;
  currentEntries: { id: number, title: string, content: string, fullContent: string, comments: number }[] = []; // Explicitly declare type
  totalPages = 0;

  constructor() { }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.blogEntries.length / this.entriesPerPage);
    this.updateBlogEntries();
  }

  updateBlogEntries() {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    this.currentEntries = this.blogEntries.slice(startIndex, endIndex);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updateBlogEntries();
  }

  showFullContent(id: number) {
    const partialContentId = 'partialContent' + id;
    const fullContentId = 'fullContent' + id;
    const partialContent = document.getElementById(partialContentId);
    const fullContent = document.getElementById(fullContentId);

    if (partialContent && fullContent) {
      partialContent.style.display = 'none';
      fullContent.style.display = 'block';
    }
  }

}
