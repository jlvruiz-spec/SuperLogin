import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

import { useConnections } from "../hooks/useConnections";
import { crudService2 } from "../services/crudService2";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/dist/locale/es';

moment.locale('es');

const Calendary = () => {

    const [data, setData] = useState([]);
    const [myEventsList, setMyEventsList] = useState([]);

    const navigate = useNavigate();
        
    const localizer = momentLocalizer(moment)

    const service = crudService2("api/v1/JobApplicationInterview/GetByUserId");
    const {
        loading,
        error,
        useGet,
        useGetRoute
    } = useConnections(service);    

    const getAllJobInterviews = async () => {
        let result = await useGet();
        const datas = result.map((item) => {
            const start = new Date(item.interviewDate);
            return {
                id: item.jobApplicationId,
                title: `${moment(start).format("HH:mm")} - ${item.interviewDescription} `,
                start,
                end: new Date(start.getTime() + 60 * 60 * 1000), // +1 hora
            };
        });
        setMyEventsList(datas);
    }

    useEffect(() => {
        getAllJobInterviews();
    }, []);

    const messages = {
        allDay: 'Todo el día',
        previous: 'Anterior',
        next: 'Siguiente',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
    showMore: total => `+ Ver más (${total})`
    };    

    return (<>
        <h1>Calendario</h1>

            <Calendar
                localizer={localizer}
                events={myEventsList}
                titleAccessor="title"
                startAccessor="start"
                style={{ height: 500 }}
                messages={messages}
                onSelectEvent={(event) => {
                    // 👇 redirige a otra ruta con React Router
                    navigate(`/interviews/${event.id}`);
                }}
            />

    </>)
}
export default Calendary;