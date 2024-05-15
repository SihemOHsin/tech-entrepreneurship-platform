import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {User} from "../../../../services/models/user";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit{

  user: User;
  users: any[] = [
    { firstName: '', lastName: '', email: '', authority: '' },
  ];

  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  paginatedUsers: any[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.tableOfUsers();
  }

  tableOfUsers(): void {
    this.authService.getAllUsers({ body: this.user }).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
          // Read the Blob as JSON
          const reader = new FileReader();
          reader.onload = () => {
            const jsonRes = JSON.parse(reader.result as string);
            console.log('JSON Response:', jsonRes);

            // Map the JSON response to the users array
            this.users = jsonRes.map((item: any) => {
              return {
                firstName: item.firstname,
                lastName: item.lastname,
                email: item.email,
                authority: item.authorities && item.authorities.length > 0 ? item.authorities[0].authority : ''
              };
            });

            // Calculate total number of pages
            this.totalPages = Math.ceil(this.users.length / this.pageSize);
            // Update pages array
            this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

            // Set initial page
            this.setPage(1);
          };
          reader.readAsText(res);
        } else {
          // Handle non-Blob response
          console.error('Response is not a Blob.');
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  setPage(page: number) {
    // Validate page number
    if (page < 1 || page > this.totalPages) {
      return;
    }

    // Update current page
    this.currentPage = page;

    // Calculate start and end index of users for current page
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.users.length - 1);

    // Extract users for current page
    this.paginatedUsers = this.users.slice(startIndex, endIndex + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
}
