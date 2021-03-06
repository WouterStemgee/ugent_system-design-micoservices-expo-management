import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Event Reservation
  getReservationAvailability(startDate, endDate, capacity, halls) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('capacity', capacity)
      .set('halls', halls);
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiGatewayUri + '/reservation/availability', {params}).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }
  createReservation(startDate, endDate, capacity, halls, maxVisitors, ticketPrice) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/reservation/create',
        {startDate, endDate, capacity, halls, maxVisitors, ticketPrice})
        .subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  // Event Management
  getEventInformation(eventId) {
    const params = new HttpParams().set('eventId', eventId);
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiGatewayUri + '/event-management/information', {params}).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }
  endEvent(eventId) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/event-management/end/' + eventId, {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Parking
  createParkingTicket() {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/parking/tickets/create/', {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
  validateParkingTicket(ticketId) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/parking/tickets/validate/' + ticketId, {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
  exitParking(ticketId) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/parking/tickets/exit/' + ticketId, {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Tracking
  getProgress(eventId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiGatewayUri + '/tracking?eventId='+eventId)
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
  updateProgress(status, eventId) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/tracking',{status,eventId})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Ticket
  getTicketAvailability(eventId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiGatewayUri + '/ticket/' + eventId + '/availability', {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
  buyTicket(eventId, name, numberOfTickets) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/ticket/buy',
      {eventId, name, numberOfTickets})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
  payTicket(eventId, name, numberOfTickets, totalPrice) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/ticket/pay',
      {eventId, name, numberOfTickets, totalPrice})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
  validateTicket(ticketId) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiGatewayUri + '/ticket/' + ticketId + '/validate', {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Badge
  rechargeBadge(badgeId, amount) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiGatewayUri + '/badge/' + badgeId + '/recharge', {amount})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Food and Drinks
  createOrder(eventId, badgeId, lineItems) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/food-and-drinks',
      {eventId, badgeId, lineItems})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Cloakroom
  addCloakroomItem(badgeId) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiGatewayUri + '/cloakroom/item?badgeId='+badgeId,"")
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  removeCloakroomItem(itemId) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.apiGatewayUri + '/cloakroom/' + itemId)
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  getAllCloakroomItems() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiGatewayUri + '/cloakroom')
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  // Multimedia
  updateInformationBoards(message) {
	  const params = new HttpParams().set('message',message);
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/multimedia/postMessageToAll?'+params.toString() , {}).subscribe(
        result => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  // Security
  triggerEmergency(type, severity, source) {

    const params = new HttpParams()
      .set('type', type)
      .set('severity', severity)
      .set('source', source);
	console.log(params.toString());
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiGatewayUri + '/security/emergency?'+params.toString(), {})
        .subscribe(
          result => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
}
