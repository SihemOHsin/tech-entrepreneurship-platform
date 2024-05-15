import {Component, OnInit} from '@angular/core';
import {User} from "../../../../services/models/user";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  };

  numberOfAllUsers: number = 0;
  numberOfEntrepreneurs: number = 0;
  numberOfITExperts: number = 0;
  date: string[];

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.fetchNumberOfUsers();

  }

  fetchNumberOfUsers(): void {
    this.authService.getAllUsers({body: this.user}).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
          // Read the Blob as JSON
          const reader = new FileReader();
          reader.onload = () => {
            const jsonRes = JSON.parse(reader.result as string);
            console.log('JSON Response:', jsonRes);

            // Initialize count variables
            let idCount = 0;
            let entrCount = 0;
            let expCount = 0;

            // Loop through JSON response to count occurrences of the desired ID
            jsonRes.forEach((item: any) => {
              // Count users 'id'
              if (item.id) {
                idCount++;
              }
              // Check if user is an entrepreneur
              if (item.authorities.some((auth: any) => auth.authority === "ENTREPRENEUR")) {
                entrCount++;
              }
              // Check if user is an IT expert
              if (item.authorities.some((auth: any) => auth.authority === "ITEXPERT")) {
                expCount++;
              }
            });

            this.numberOfAllUsers = idCount;
            this.numberOfEntrepreneurs = entrCount;
            this.numberOfITExperts = expCount;

            console.log('Count of desired ID:', idCount);
            console.log('Count of Entrepreneurs:', entrCount);
            console.log('Count of IT Experts:', expCount);

            // Call the function to draw charts
            this.drawPieChart();

            const { dates, entrepreneurCounts, expertCounts } = this.fetchDatesAndCountsForLineChart(jsonRes);
            this.drawLineChart(dates, entrepreneurCounts, expertCounts);
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




  // Function to draw the donuts chart
  drawPieChart(): void {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Entrepreneurs', 'IT Experts'],
        datasets: [{
          data: [this.numberOfEntrepreneurs, this.numberOfITExperts],
          backgroundColor: [
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                let label = context.label || '';
                if (context.parsed && context.parsed.length > 0) {
                  const parsed: number[] = context.parsed;
                  label += ': ' + parsed[0].toLocaleString() + ' (' +
                    ((parsed[0] / this.numberOfAllUsers) * 100).toFixed(2) + '%)';
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  fetchDatesAndCountsForLineChart(jsonRes: any[]): { dates: string[], entrepreneurCounts: number[], expertCounts: number[] } {
    let entrepreneurCounts: number[] = [];
    let expertCounts: number[] = [];
    let dates: string[] = [];

    jsonRes.forEach((item: any) => {
      if (item.createdDate) {
        const createdDate = new Date(item.createdDate);
        const day = createdDate.getDate();
        const month = createdDate.getMonth() + 1;
        const year = createdDate.getFullYear();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

        const existingIndex = dates.indexOf(formattedDate);
        if (existingIndex !== -1) {
          entrepreneurCounts[existingIndex] += item.authorities.some((auth: any) => auth.authority === "ENTREPRENEUR") ? 1 : 0;
          expertCounts[existingIndex] += item.authorities.some((auth: any) => auth.authority === "ITEXPERT") ? 1 : 0;
        } else {
          dates.push(formattedDate);
          entrepreneurCounts.push(item.authorities.some((auth: any) => auth.authority === "ENTREPRENEUR") ? 1 : 0);
          expertCounts.push(item.authorities.some((auth: any) => auth.authority === "ITEXPERT") ? 1 : 0);
        }
      }
    });

    return { dates, entrepreneurCounts, expertCounts };
  }

  // Function to draw the line chart
  drawLineChart(dates: string[], entrepreneurCounts: number[], expertCounts: number[]): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Entrepreneurs',
          data: entrepreneurCounts,
          borderColor: 'rgba(0, 0, 0, 0.8)',
          fill: false
        }, {
          label: 'IT Experts',
          data: expertCounts,
          borderColor: 'rgba(0, 0, 0, 0.2)',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
      }
    });
  }
}
