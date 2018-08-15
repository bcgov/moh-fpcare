import { Injectable } from '@angular/core';
import { StatusCheckPHNPayload, StatusCheckRegNumberPayload } from '../models/api.model';


@Injectable({
  providedIn: 'root'
})
export class ResponseStoreService {

  constructor() { }

  statusCheckRegNumber: StatusCheckRegNumberPayload;
  statusCheckPHN: StatusCheckPHNPayload;
}
