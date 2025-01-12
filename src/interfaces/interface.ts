export interface EventParameters{
    insuredId: string,
    scheduleId: String,
    countryISO: string
}

export interface ScheduleParameters{
    scheduleId: number,
    centerId: number,
    specialtyId: number,
    medicId: number,
    date: string
}
export interface DatabaseCredentials {
    host: string;
    user: string;
    password: string;
}