export class AppointmentDTO {
  constructor(id: string,
    appointmentStartDate: Date, appointmentFinalDate: Date,
    state: string,
    type: string,
    description: string,
    patientId: string,
    doctorId: string,
    doctorFullName: string,
    patientFullName: string) {
    this.id = id;
    this.appointmentStartDate = appointmentStartDate;
    this.appointmentFinalDate = appointmentFinalDate;
    this.state = state;
    this.type =type;
    this.description =description;
    this.patientId =patientId;
    this.doctorId =doctorId;
    this.doctorFullName =doctorFullName;
    this.patientFullName =patientFullName;
  }

  id: string;
  appointmentStartDate: Date;
  appointmentFinalDate: Date;
  state: string;
  type: string;
  description: string;
  patientId: string;
  doctorId: string;
  doctorFullName: string;
  patientFullName: string;
}
