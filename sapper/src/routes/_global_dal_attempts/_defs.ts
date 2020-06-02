
export interface Service {
  service_name: string;
  execution_order: number;
  previous_service: Service;
  next_services: Array<Service>;
  query?: {[key: string]: string};
}

export class Service {
  constructor(
      service_name,
      query = {},
      execution_order = 1,
      previous_service = undefined,
      next_services = []
  ){
      this.service_name = service_name;
      this.execution_order = execution_order;
      this.previous_service = previous_service;
      this.next_services = next_services;
      this.query = query;
  }
}

export interface Interservice {
  formatted_data: {[key: string]: Object};
  next_services: {[key: string]: Service};
}

export class Interservice {
  constructor(
      formatted_data,
      next_services={}
  ) {
      this.formatted_data = formatted_data
      this.next_services = next_services
  }
}

export interface Book {
  title: string
  author: string
  nominator: string
  comments: string
}